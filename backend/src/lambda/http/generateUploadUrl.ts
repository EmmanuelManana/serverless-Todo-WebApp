import 'source-map-support/register'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getUploadUrl } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
const logger = createLogger('Bucket')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('GET URL Processing event: ', event)

  const todoId = event.pathParameters.todoId

  const url = await getUploadUrl(todoId)

  logger.info('GET URL Event complete: ', event)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: url
    })
  }
}
