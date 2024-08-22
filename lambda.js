import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  ScanCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log(event);

  if (event.queryStringParameters && event.queryStringParameters.id) {
    const command = new GetCommand({
      TableName: Resource.MyTable.name,
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

  const command = new ScanCommand({
    TableName: Resource.MyTable.name,
  });

  const response = await docClient.send(command);

  console.log(response);

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
  };
};
