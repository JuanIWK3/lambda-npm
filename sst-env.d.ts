/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "DeleteItem": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "MyApi": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "MyApp": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "MyTable": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "test": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
  }
}
export {}
