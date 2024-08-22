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
    const table = new sst.aws.Dynamo("MyTable", {
      fields: {
        id: "string",
      },
      primaryIndex: { hashKey: "id" },
      stream: "new-and-old-images",
    });

    const table2 = new sst.aws.Dynamo("test", {
      fields: {
        id: "string",
      },
      primaryIndex: { hashKey: "id" },
      stream: "NEW_AND_OLD_IMAGES",
    });

    const getItems = new sst.aws.Function("MyApi", {
      handler: "lambda.handler",
      link: [table, table2],
      url: true,
    });

    const deleteItem = new sst.aws.Function("DeleteItem", {
      handler: "delete.handler",
      link: [table],
      url: true,
    });

    const publisher = new sst.aws.Function("MyApp", {
      handler: "publisher.handler",
      link: [table],
      url: true,
    });

    return {
      items: getItems.url,
      publish: publisher.url,
      delete: deleteItem.url,
    };
  },
});
