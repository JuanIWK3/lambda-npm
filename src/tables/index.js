export const tables = [
  {
    name: "Greetings",
    fields: {
      id: "string",
    },
    primaryKey: {
      hashKey: "id",
    },

    stream: "NEW_AND_OLD_IMAGES",
  },
];
