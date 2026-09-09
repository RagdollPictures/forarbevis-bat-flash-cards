const APP_ID = "forarbevis_bat";

const TABLE_NAMES = [
  "final_exams",
  "courses",
  "levels",
  "units",
  "bonus_levels",
  "questions",
  "level_graphics",
  "shared_ui_text",
];

const COURSE_SCOPED_TABLE_NAMES = [
  "final_exams",
  "levels",
  "units",
  "bonus_levels",
  "questions",
  "level_graphics",
];

function onOpen() {
  SpreadsheetApp
    .getUi()
    .createMenu("Quiz Engine")
    .addItem(
      "Synka till Supabase",
      "syncQuizEngine"
    )
    .addToUi();
}

function readSheetRows(sheetName) {
  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(
      `Fliken "${sheetName}" saknas.`
    );
  }

  const values =
    sheet.getDataRange().getValues();

  if (values.length < 2) {
    return [];
  }

  const headers =
    values[0].map(
      (header) =>
        String(header).trim()
    );

  return values
    .slice(1)
    .filter((row) =>
      row.some(
        (value) => value !== ""
      )
    )
    .map((row) => {
      const obj = {};

      headers.forEach(
        (header, index) => {
          obj[header] =
            row[index] === ""
              ? null
              : row[index];
        }
      );

      return obj;
    });
}

function readFullCourse() {
  return {
    courses:
      readSheetRows("courses"),

    levels:
      readSheetRows("levels"),

    units:
      readSheetRows("units"),

    bonus_levels:
      readSheetRows(
        "bonus_levels"
      ),

    questions:
      readSheetRows("questions"),

    level_graphics:
      readSheetRows(
        "level_graphics"
      ),

    shared_ui_text:
      readSheetRows(
        "shared_ui_text"
      ),
      final_exams:
  readSheetRows(
    "final_exams"
  ),
  };
}

function normalizeId(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}

function getManagedCourseIds(
  tables
) {
  const ids = [];
  const seen = {};

  tables.courses.forEach(
    (row, index) => {
      const courseId =
        normalizeId(row.id);

      const appId =
        normalizeId(row.app_id);

      if (!courseId) {
        throw new Error(
          `courses rad ${index + 2}: id saknas.`
        );
      }

      if (appId !== APP_ID) {
        throw new Error(
          `courses rad ${index + 2}: app_id "${appId}" matchar inte "${APP_ID}".`
        );
      }

      if (seen[courseId]) {
        throw new Error(
          `courses innehåller dubbelt id: "${courseId}".`
        );
      }

      seen[courseId] = true;
      ids.push(courseId);
    }
  );

  if (ids.length === 0) {
    throw new Error(
      "courses innehåller inga kurser."
    );
  }

  COURSE_SCOPED_TABLE_NAMES.forEach(
    (tableName) => {
      tables[tableName].forEach(
        (row, index) => {
          const courseId =
            normalizeId(
              row.course_id
            );

          if (!courseId) {
            throw new Error(
              `${tableName} rad ${index + 2}: course_id saknas.`
            );
          }

          if (!seen[courseId]) {
            throw new Error(
              `${tableName} rad ${index + 2}: course_id "${courseId}" finns inte i courses-fliken.`
            );
          }
        }
      );
    }
  );

  return ids;
}

function sortUnitsSheet() {
  const sheet =
    SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("units");

  if (!sheet) {
    throw new Error(
      'Fliken "units" saknas.'
    );
  }

  const lastRow =
    sheet.getLastRow();

  const lastColumn =
    sheet.getLastColumn();

  if (lastRow < 3) {
    return;
  }

  const headers =
    sheet
      .getRange(
        1,
        1,
        1,
        lastColumn
      )
      .getValues()[0]
      .map((header) =>
        String(header).trim()
      );

  const courseIdColumn =
    headers.indexOf(
      "course_id"
    ) + 1;

  const levelIdColumn =
    headers.indexOf(
      "level_id"
    ) + 1;

  const sortOrderColumn =
    headers.indexOf(
      "sort_order"
    ) + 1;

  if (courseIdColumn === 0) {
    throw new Error(
      'Kolumnen "course_id" saknas i units.'
    );
  }

  if (levelIdColumn === 0) {
    throw new Error(
      'Kolumnen "level_id" saknas i units.'
    );
  }

  if (sortOrderColumn === 0) {
    throw new Error(
      'Kolumnen "sort_order" saknas i units.'
    );
  }

  sheet
    .getRange(
      2,
      1,
      lastRow - 1,
      lastColumn
    )
    .sort([
      {
        column: courseIdColumn,
        ascending: true,
      },
      {
        column: levelIdColumn,
        ascending: true,
      },
      {
        column: sortOrderColumn,
        ascending: true,
      },
    ]);
}

function callFullCourseSync(
  tables,
  courseIds,
  apply,
  expectedDeleteCounts
) {
  const props =
    PropertiesService
      .getScriptProperties();

  const supabaseUrl =
    props.getProperty(
      "SUPABASE_URL"
    );

  const syncSecret =
    props.getProperty(
      "QUIZ_ENGINE_SYNC_SECRET"
    );

  if (!supabaseUrl) {
    throw new Error(
      "SUPABASE_URL saknas i Script Properties."
    );
  }

  if (!syncSecret) {
    throw new Error(
      "QUIZ_ENGINE_SYNC_SECRET saknas i Script Properties."
    );
  }

  const payload = {
    appId: APP_ID,
    courseIds,
    tables,
    apply: apply === true,
  };

  if (expectedDeleteCounts) {
    payload.expectedDeleteCounts =
      expectedDeleteCounts;
  }

  const response =
    UrlFetchApp.fetch(
      `${supabaseUrl}/functions/v1/quiz-engine-sync`,
      {
        method: "post",
        contentType:
          "application/json",
        headers: {
          "x-quiz-engine-secret":
            syncSecret,
        },
        payload:
          JSON.stringify(payload),
        muteHttpExceptions: true,
      }
    );

  const status =
    response.getResponseCode();

  const text =
    response.getContentText();

  let body;

  try {
    body =
      JSON.parse(text);
  } catch {
    body = {
      error: text,
    };
  }

  return {
    status,
    body,
  };
}

function syncQuizEngine() {
  const ui =
    SpreadsheetApp.getUi();

  try {
    sortUnitsSheet();

    const tables =
      readFullCourse();

    const courseIds =
      getManagedCourseIds(
        tables
      );

    const dryRun =
      callFullCourseSync(
        tables,
        courseIds,
        false
      );

    if (dryRun.status !== 200) {
      ui.alert(
        "Synken stoppades",
        formatError(
          dryRun.body
        ),
        ui.ButtonSet.OK
      );

      return;
    }

    const result =
      dryRun.body.tables;

    const lines =
      TABLE_NAMES.map(
        (tableName) => {
          const info =
            result[tableName];

          return (
            `${tableName}: ` +
            `${info.sheet} rader` +
            ` | +${info.new}` +
            ` | -${info.wouldDelete}`
          );
        }
      );

    const totalNew =
      TABLE_NAMES.reduce(
        (sum, tableName) =>
          sum +
          result[tableName].new,
        0
      );

    const totalDeletes =
      TABLE_NAMES.reduce(
        (sum, tableName) =>
          sum +
          result[tableName]
            .wouldDelete,
        0
      );

    let message =
      `Kurser: ${courseIds.join(", ")}\n\n`;

    message +=
      lines.join("\n");

    message +=
      `\n\nNya rader: ${totalNew}`;

    message +=
      `\nRader som tas bort: ${totalDeletes}`;

    if (totalDeletes > 0) {
      message +=
        "\n\n⚠️ Raderingar kommer att göras i Supabase.";
    }

    message +=
      "\n\nVill du genomföra synken?";

    const answer =
      ui.alert(
        "Synka till Supabase",
        message,
        ui.ButtonSet.YES_NO
      );

    if (
      answer !== ui.Button.YES
    ) {
      return;
    }

    const expectedDeleteCounts =
      {};

    TABLE_NAMES.forEach(
      (tableName) => {
        expectedDeleteCounts[
          tableName
        ] =
          result[
            tableName
          ].wouldDelete;
      }
    );

    const applied =
      callFullCourseSync(
        tables,
        courseIds,
        true,
        expectedDeleteCounts
      );

    if (applied.status !== 200) {
      ui.alert(
        "Synken stoppades",
        formatError(
          applied.body
        ),
        ui.ButtonSet.OK
      );

      return;
    }

    ui.alert(
      "Synk klar ✅",
      [
        `Kurser: ${courseIds.length}`,
        `courses: ${tables.courses.length}`,
        `levels: ${tables.levels.length}`,
        `units: ${tables.units.length}`,
        `bonus_levels: ${tables.bonus_levels.length}`,
        `questions: ${tables.questions.length}`,
        `level_graphics: ${tables.level_graphics.length}`,
        `shared_ui_text: ${tables.shared_ui_text.length}`,
        `final_exams: ${tables.final_exams.length}`,
        "",
        `Nya: ${totalNew}`,
        `Raderade: ${totalDeletes}`,
      ].join("\n"),
      ui.ButtonSet.OK
    );
  } catch (error) {
    ui.alert(
      "Synken misslyckades",
      error instanceof Error
        ? error.message
        : String(error),
      ui.ButtonSet.OK
    );
  }
}

function formatError(body) {
  if (
    body &&
    typeof body === "object"
  ) {
    return JSON.stringify(
      body,
      null,
      2
    );
  }

  return String(body);
}