const APP_ID = "forarbevis_bat";
const COURSE_ID = "forarbevis";

const TABLE_NAMES = [
  "courses",
  "levels",
  "units",
  "bonus_levels",
  "questions",
  "level_graphics",
  "shared_ui_text",
];


/**
 * Skapar menyn när Google Sheet öppnas.
 */
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


/**
 * Läser en hel flik och gör varje rad
 * till ett objekt baserat på rubrikerna.
 *
 * Tomma celler skickas som null.
 */
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

    // Ignorera helt tomma rader.
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


/**
 * Läser alla fyra tabeller från arket.
 */
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
  };
}


/**
 * Sorterar units-fliken.
 *
 * Först efter level_id,
 * sedan efter sort_order.
 *
 * Rubrikraden påverkas inte.
 */
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

  /*
   * Om det bara finns rubrik +
   * högst en datarad finns inget
   * att sortera.
   */
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

  const levelIdColumn =
    headers.indexOf(
      "level_id"
    ) + 1;

  const sortOrderColumn =
    headers.indexOf(
      "sort_order"
    ) + 1;

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
        column: levelIdColumn,
        ascending: true,
      },
      {
        column: sortOrderColumn,
        ascending: true,
      },
    ]);
}


/**
 * Anropar Supabase Edge Function.
 *
 * apply = false
 *   → bara dry-run / jämförelse
 *
 * apply = true
 *   → genomför synken
 */
function callFullCourseSync(
  tables,
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
    courseId: COURSE_ID,
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


/**
 * Kör hela synkflödet:
 *
 * 1. Sortera units
 * 2. Läs Google Sheets
 * 3. Dry-run mot Supabase
 * 4. Visa vad som ändras
 * 5. Be om bekräftelse
 * 6. Genomför synken
 */
function syncQuizEngine() {
  const ui =
    SpreadsheetApp.getUi();

  try {
    /*
     * Sortera units efter:
     *
     * 1. level_id
     * 2. sort_order
     */
    sortUnitsSheet();


    /*
     * Läs hela kursen från Sheets.
     */
    const tables =
      readFullCourse();


    /*
     * DRY RUN
     *
     * Ingenting ändras i Supabase.
     */
    const dryRun =
      callFullCourseSync(
        tables,
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


    /*
     * Bygg förhandsvisningen.
     */
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


    /*
     * Be användaren bekräfta.
     */
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


    /*
     * Edge Functionen kräver att
     * delete-antalen är exakt samma
     * som i dry-run.
     */
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


    /*
     * RIKTIG SYNK
     */
    const applied =
      callFullCourseSync(
        tables,
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


    /*
     * Klart.
     */
    ui.alert(
      "Synk klar ✅",
      [
        `levels: ${tables.levels.length}`,
        `units: ${tables.units.length}`,
        `bonus_levels: ${tables.bonus_levels.length}`,
        `questions: ${tables.questions.length}`,
        `level_graphics: ${tables.level_graphics.length}`,
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


/**
 * Gör fel från Edge Functionen
 * lite enklare att läsa.
 */
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