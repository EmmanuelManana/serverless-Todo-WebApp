import * as AWS from 'aws-sdk'

import { createLogger } from '../utils/logger'

const logger = createLogger('Bucket')

export class BucketAccess {
  constructor(
    private readonly s3: AWS.S3 = new AWS.S3({ signatureVersion: 'v4' }),
    private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
  ) {}

  async getUploadUrl(todoId: string): Promise<string> {
    const result = await this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: todoId,
      Expires: this.urlExpiration
    })

    logger.info('Signed url for bucket created: ', { result: result })

    return result
  }
}
