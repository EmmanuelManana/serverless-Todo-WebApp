import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { getUserIdFromHeader } from '../../auth/utils'

import { createLogger } from '../../utils/logger'
import { deleteTodo } from '../../businessLogic/todos'
const logger = createLogger('todo')

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('DELETE Processing event: ', event)
  const todoId = event.pathParameters.todoId

  const userId = getUserIdFromHeader(event.headers.Authorization)

  const deleteitem = await deleteTodo(todoId, userId)
  logger.info('DELETE Event complete', event)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      deleteitem
    })
  }
}
