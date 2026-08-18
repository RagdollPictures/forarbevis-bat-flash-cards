export const course = {
  id: "forarbevis",
  name: "Förarbevis båt",
  sourceId: "forarintyg",
  sourceTitle: "Forarintyg.se",

  levels: {
    level_001: {
      id: "level_001",
      chapterId: "sjokortet",
      titleShort: "Kartor",
      label: "Kartunderlag & koordinater",
        
    },

    level_002: {
      id: "level_002",
      chapterId: "sjokortet_sjomarken",
      titleShort: "Märken",
      label: "Sjövägsmärken & markeringar",
        
    },

    level_003: {
      id: "level_003",
      chapterId: "sjokortsarbete",
      titleShort: "Mätning",
      label: "Praktiskt arbete i sjökort",
        
    },

    level_004: {
      id: "level_004",
      chapterId: "navigationsteori",
      titleShort: "Navigering",
      label: "Navigationsprinciper",
        
    },

    level_005: {
      id: "level_005",
      chapterId: "praktisk_navigation",
      titleShort: "Rutter",
      label: "Navigering i praktiken",
        
    },

    level_006: {
      id: "level_006",
      chapterId: "vajningsregler",
      titleShort: "Regler",
      label: "Trafikregler till sjöss",
        
    },

    level_007: {
      id: "level_007",
      chapterId: "lanternor",
      titleShort: "Ljus",
      label: "Navigationsljus",
        
    },

    level_008: {
      id: "level_008",
      chapterId: "manovrering",
      titleShort: "Styrning",
      label: "Båtens rörelser & kontroll",
        
    },

    level_009: {
      id: "level_009",
      chapterId: "navigationsinstrument",
      titleShort: "Utrustning",
      label: "Instrument & utrustning",
        
    },

    level_010: {
      id: "level_010",
      chapterId: "sjomanskap",
      titleShort: "Vett",
      label: "Båtvett & ombordkunskap",
        
    },

    level_011: {
      id: "level_011",
      chapterId: "signalering",
      titleShort: "Signaler",
      label: "Kommunikation till sjöss",
        
    },

    level_012: {
      id: "level_012",
      chapterId: "sakerhet",
      titleShort: "Skydd",
      label: "Säkerhet & beredskap",
        
    },

    level_013: {
      id: "level_013",
      chapterId: "sjukvard",
      titleShort: "Vård",
      label: "Första hjälpen ombord",
        
    },

    level_014: {
      id: "level_014",
      chapterId: "vader",
      titleShort: "Väder",
      label: "Meteorologi för båtfolk",
        
    },

    level_015: {
      id: "level_015",
      chapterId: "miljo",
      titleShort: "Natur",
      label: "Natur och ansvar",
        
    },
  },
} as const;

export type CourseLevelId = keyof typeof course.levels;