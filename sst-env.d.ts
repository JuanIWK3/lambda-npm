/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "CreateItem": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "DeleteItem": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "GetAllItems": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "Greetings": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
  }
}
export {}
