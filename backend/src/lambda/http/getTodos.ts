import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getAllTodos } from '../../businessLogic/todos'
import { getUserIdFromHeader } from '../../auth/utils'

const logger = createLogger('todo')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('GET TODO Processing event: ', event)

  const userId = getUserIdFromHeader(event.headers.Authorization)

  const todoes = await getAllTodos(userId)

  logger.info('GET TODO Event complete: ', event)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: todoes
    })
  }
}
