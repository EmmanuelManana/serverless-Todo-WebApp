import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { createLogger } from '../utils/logger'

const logger = createLogger('Todo DB Operation')

export class TodoAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE
  ) {}

  async getAllTodos(userId: string): Promise<TodoItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()
    logger.info('Got Todos: ', result.Items)
    const items = result.Items

    return items as TodoItem[]
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: todo
      })
      .promise()
    logger.info('Created Todo: ', todo)
    return todo
  }

  async deleteTodo(todoId: string, userId: string) {
    await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: {
          userId: userId,
          todoId: todoId
        }
      })
      .promise()
    logger.info('Deleted Todo: ', todoId)
    return ''
  }

  async updateTodo(todo: TodoUpdate, todoId: string, userId: string) {
    const result = await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          userId: userId,
          todoId: todoId
        },
        ExpressionAttributeNames: {
          '#todo_name': 'name'
        },
        ExpressionAttributeValues: {
          ':name': todo.name,
          ':dueDate': todo.dueDate,
          ':done': todo.done
        },
        UpdateExpression:
          'SET #todo_name = :name, dueDate = :dueDate, done = :done',
        ReturnValues: 'ALL_NEW'
      })
      .promise()

    logger.info('Updated Todo: ', todo)

    return result.Attributes ? true : false
  }
}
