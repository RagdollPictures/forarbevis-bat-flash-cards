# Content

Den här mappen innehåller det kursspecifika innehållet för appen.

Målet är att koden under `app/`, `components/`, `constants/`, `hooks/` och `scripts/`
ska kunna återanvändas för andra kurser, medan kursens frågor, struktur, grafik och
nivåkonfiguration huvudsakligen finns här.

## Viktigt: radera inte filer bara för att appen inte importerar dem

Projektet innehåller både runtime-filer och källfiler som används av scripts.

En SVG-fil kan därför vara mycket viktig även om ingen `.tsx`-fil importerar den.

Innan en fil tas bort måste man kontrollera:

1. Om appen använder den direkt.
2. Om något script använder den.
3. Om den är källmaterial för en genererad fil.
4. Om den behövs för att redigera eller generera framtida banor.

---

# Struktur

```text
content/
├── course.ts
├── README.md
│
├── questions/
│   ├── index.ts
│   ├── decks.ts
│   ├── courseStructure.ts
│   ├── bonusLevels.ts
│   └── forarintyg_se/
│       └── ...
│
├── levels/
│   └── levelThemes.ts
│
└── assets/
    ├── bonus-icons/
    ├── cards/
    ├── chapter-icons/
    ├── bonusIcons.ts
    ├── chapterIcons.ts
    ├── questionImages.ts
    ├── headerMiniMap.ts
    └── game/
        └── ...
```

---

# course.ts

`course.ts` innehåller kursens övergripande konfiguration.

Här definieras bland annat:

- kursens id
- kursens namn
- källa
- vilka levels kursen har
- kopplingen mellan level och kapitel
- kort titel för varje level
- etikett för varje level

Exempel:

```ts
level_001: {
  id: "level_001",
  chapterId: "sjokortet",
  titleShort: "Kartor",
  label: "Kartunderlag & koordinater",
},
```

Appmotorn bygger listan över levels dynamiskt från `course.levels`.

---

# Questions

`questions/` innehåller kursens frågor och struktur.

## forarintyg_se/

Här ligger de faktiska frågekorten uppdelade efter ämne och delkapitel.

Exempel:

```text
questions/
└── forarintyg_se/
    ├── lanternor/
    ├── manovrering/
    ├── miljo/
    ├── navigationsteori/
    ├── sakerhet/
    ├── sjokortet/
    └── ...
```

## index.ts

`questions/index.ts` är en barrel-fil som återexporterar de enskilda frågedecken.

Den används bland annat av `decks.ts`.

## decks.ts

Kopplar ihop de enskilda frågedecken till kursens decks.

## courseStructure.ts

Beskriver kursens kapitelstruktur.

## bonusLevels.ts

Innehåller konfiguration för bonusnivåer och deras upplåsning.

---

# Assets

`assets/` innehåller kursens grafik.

## cards/

Bilder som används på flashcards/frågor.

## chapter-icons/

Grafik för kursens kapitelikoner.

## bonus-icons/

Grafik för bonusnivåer.

## chapterIcons.ts

Kopplar kapitel-id till rätt ikon.

## bonusIcons.ts

Kopplar bonusnivåer till rätt ikon.

## questionImages.ts

Kopplar frågornas `imageKey` till bildfiler.

## headerMiniMap.ts

Innehåller koordinaterna och linjen för minimapen i level-headern.

Minimapens koordinater kommer ursprungligen från en SVG/design.

Det är därför viktigt att behålla original-SVG:n som designkälla om den finns,
även om appen inte läser SVG-filen direkt.

---

# Level-systemet

Alla levels använder en gemensam level-layout.

Den viktigaste designkällan är:

```text
content/assets/game/level_001.svg
```

Den här SVG-filen är inte bara vanlig grafik.

Den fungerar som källfil för generering av både layoutdata och React Native-SVG.

## SVG-ankare

SVG:n innehåller namngivna ankare, till exempel:

```text
anchor_read_001
anchor_quiz_001
anchor_chapter_test_01
title_box_01
anchor_object_01
```

Dessa används för att placera innehåll på banan.

### Read

```text
anchor_read_XXX
```

anger positionen för ett läsmoment.

### Quiz

```text
anchor_quiz_XXX
```

anger positionen för ett quizmoment.

### Chapter test

```text
anchor_chapter_test_XX
```

anger positionen för ett kapiteltest.

### Title box

```text
title_box_XX
```

anger position och storlek för en titelruta.

### Object

```text
anchor_object_XX
```

kan användas för objekt som placeras på banan.

Objektsystemet är generell funktionalitet och ska inte tas bort bara för att den
nuvarande kursen inte använder objekt på alla eller några levels.

---

# Generering från SVG

Det finns två viktiga scripts för level-systemet.

## scripts/svg.js

Detta script läser SVG-filer och extraherar ankarnas koordinater.

Det skapar JSON-filer med bland annat:

- `viewBox`
- anchor-id
- x/y-positioner
- title-box-storlek
- objektsankare

Scriptet kan köras mot en mapp.

Exempel:

```powershell
node scripts/svg.js content/assets/game
```

Om exempelvis:

```text
content/assets/game/level_001.svg
```

finns i mappen skapas/uppdateras:

```text
content/assets/game/level_001.json
```

JSON-filen används sedan av appens level-layout.

---

## scripts/build-level.js

Detta script använder:

```text
content/assets/game/level_001.svg
```

och bygger React Native-komponenten:

```text
app/game/SharedLevelSvg.tsx
```

Körs via:

```powershell
npm run build:level
```

`SharedLevelSvg.tsx` är alltså en **genererad fil**.

Om SVG-källan ändras ska komponenten byggas om.

Ändringar som ska överleva framtida builds bör normalt göras i SVG-källan eller
generatorn, inte genom att endast handredigera den genererade komponenten.

---

# Level-byggkedjan

Förenklat fungerar systemet så här:

```text
content/assets/game/level_001.svg
            │
            ├── scripts/svg.js
            │       │
            │       ▼
            │   level_001.json
            │       │
            │       ▼
            │   sharedLevelLayout.ts
            │       │
            │       ▼
            │   levelNodeMapper.ts
            │
            └── scripts/build-level.js
                    │
                    ▼
              SharedLevelSvg.tsx
                    │
                    ▼
               LevelMapView
```

SVG-filen är därför **källmaterial**, även om själva appen inte importerar den.

---

# Chapters menu

`chapters_menu.svg` är designkällan för kapitelmenyn.

Dess ankare kan konverteras till JSON med samma SVG-parser:

```powershell
node scripts/svg.js content/assets/game
```

Det innebär att både exempelvis:

```text
chapters_menu.svg
level_001.svg
```

kan behandlas av samma generella `scripts/svg.js`, förutsatt att deras ankare
följer de namnformat som scriptet känner igen.

Original-SVG:n ska behållas även efter att JSON-filen har genererats.

---

# Header minimap

Header-minimapen fungerar lite annorlunda.

Runtime-datan ligger i:

```text
content/assets/headerMiniMap.ts
```

och innehåller:

- `viewBoxWidth`
- `viewBoxHeight`
- koordinater för varje level
- SVG-path mellan punkterna

Koordinaterna har tagits från minimap-designens SVG.

Det finns för närvarande inget separat automatiskt script i projektet som
genererar `headerMiniMap.ts` från minimap-SVG:n.

Original-SVG:n bör därför sparas som designkälla.

---

# Level themes

`content/levels/levelThemes.ts` innehåller sådant som kan skilja mellan levels,
bland annat:

- accentfärg
- textfärg
- vilket SVG-lager som hör till nivån
- antal dekorationslager
- bakgrunds-SVG

Exempel:

```ts
level_007: {
  ...defaultTheme,
  levelLayerId: "level_007",
  decoCount: 6,
},
```

`decoCount` används av level-systemet för att bestämma hur många `deco_XX`-lager
som ska visas.

`levelLayerId` bestämmer vilket `level_XXX`-lager som ska visas från den
gemensamma level-SVG:n.

---

# Genererade filer

Var särskilt försiktig med skillnaden mellan källfil och genererad fil.

Exempel:

```text
KÄLLA
content/assets/game/level_001.svg

        ↓

GENERERAT
content/assets/game/level_001.json
app/game/SharedLevelSvg.tsx
```

Grundregeln är:

> Behåll alltid källfilen även om appen endast använder den genererade filen.

---

# När en ny level-design exporteras

När `level_001.svg` ändras eller exporteras på nytt:

1. Lägg den nya SVG:n på rätt plats:

```text
content/assets/game/level_001.svg
```

2. Generera JSON-koordinaterna:

```powershell
node scripts/svg.js content/assets/game
```

3. Bygg React Native-SVG:n:

```powershell
npm run build:level
```

4. Kontrollera TypeScript:

```powershell
npx tsc --noEmit
```

5. Starta appen och kontrollera:

- read-noder
- quiz-noder
- chapter tests
- titlar
- dekorationslager
- eventuella objekt
- scroll/höjd
- bakgrund

6. Commit/push först när banan fungerar.

---

# Regel vid framtida kodstädning

Ta inte bort en fil eller funktion enbart för att en sökning i runtime-koden inte
hittar någon användning.

Kontrollera alltid hela kedjan:

```text
runtime
scripts
generatorer
SVG-källor
JSON
designfiler
```

En fil som ser oanvänd ut kan vara originalkällan till en genererad fil som
appen är helt beroende av.