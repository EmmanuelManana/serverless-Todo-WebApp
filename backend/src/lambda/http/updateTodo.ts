import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { getUserIdFromHeader } from "../../auth/utils";
import { updateTodo } from "../../businessLogic/todos";
import { createLogger } from "../../utils/logger";

const logger = createLogger("todo");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("UPDATE TODO Processing event: ", event);
  const todoId = event.pathParameters.todoId;
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

  const userId = getUserIdFromHeader(event.headers.Authorization);

  if (updatedTodo.name.length < 3)
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Name too short",
    };

  const dateRgx = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g;

  if (!updatedTodo.dueDate.match(dateRgx))
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Date format must be YYYY-MM-DD",
    };

  const todo = await updateTodo(updatedTodo, todoId, userId);

  logger.info("UPDATE TODO Event complete: ", event);

  return {
    statusCode: todo ? 200 : 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: "",
  };
};
