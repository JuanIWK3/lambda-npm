import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log(event);

  if (event.queryStringParameters && event.queryStringParameters.id) {
    const command = new DeleteCommand({
      TableName: Resource.Greetings.name,
      Key: {
        id: event.queryStringParameters.id,
      },
    });

    const response = await docClient.send(command);

    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(response.Item),
    };
  }

  console.error("No ID provided");

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "No ID provided" }),
  };
};
