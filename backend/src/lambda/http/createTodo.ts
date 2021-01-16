import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

import { CreateTodoRequest } from "../../requests/CreateTodoRequest";

import { createLogger } from "../../utils/logger";
import { createTodo } from "../../businessLogic/todos";
import { getUserIdFromHeader } from "../../auth/utils";

const logger = createLogger("todo");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body);
  logger.info("CREATE Processing event: ", event);

  const userId = getUserIdFromHeader(event.headers.Authorization);

  if (newTodo.name.length < 3)
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Name too short",
    };

  const dateRgx = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g;

  if (!newTodo.dueDate.match(dateRgx))
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Date format must be YYYY-MM-DD",
    };

  const newItem = await createTodo(newTodo, userId);
  logger.info("CREATE Event complete", event);
  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      item: newItem,
    }),
  };
};
