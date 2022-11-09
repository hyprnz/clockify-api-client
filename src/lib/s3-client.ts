import AWS from "aws-sdk";
import log from "../config/logger";

export async function uploadToS3Async(bucketName: string, key: string, payload: string, contentType: string) {
  const s3Config = {} as AWS.S3.ClientConfiguration;
  if (process.env.LOCALSTACK_S3_ENDPOINT) {
    log.info(
      `LOCALSTACK_S3_ENDPOINT env var set to ${process.env.LOCALSTACK_S3_ENDPOINT}; using localstack configuration for s3`
    );
    s3Config.endpoint = process.env.LOCALSTACK_S3_ENDPOINT;
    s3Config.s3ForcePathStyle = true;
  }

  const s3 = new AWS.S3(s3Config);

  var params = {
    Bucket: bucketName,
    Key: key,
    Body: payload,
    ContentType: contentType
  };

  const response = await s3.upload(params).promise();

  log.info(`uploaded data to ${response.Location}`);
}
