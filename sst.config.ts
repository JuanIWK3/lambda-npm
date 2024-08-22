/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "lambda-npm",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const table = new sst.aws.Dynamo("Greetings", {
      fields: {
        id: "string",
        createdAt: "number",
        updatedAt: "number",
      },
      primaryIndex: { hashKey: "id" },
      globalIndexes: {
        CreatedAtIndex: { hashKey: "id", rangeKey: "createdAt" },
        UpdatedAtIndex: { hashKey: "id", rangeKey: "updatedAt" },
      },

      stream: "new-and-old-images",
    });

    const getItems = new sst.aws.Function("GetAllItems", {
      handler: "src/functions/get-all.handler",
      link: [table],
      url: true,
    });

    const deleteItem = new sst.aws.Function("DeleteItem", {
      handler: "src/functions/delete.handler",
      link: [table],
      url: true,
    });

    const publisher = new sst.aws.Function("CreateItem", {
      handler: "src/functions/create.handler",
      link: [table],
      url: true,
    });

    return {
      getAll: getItems.url,
      create: publisher.url,
      delete: deleteItem.url,
      table: table.name,
    };
  },
});
