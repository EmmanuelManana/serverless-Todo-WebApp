import * as uuid from 'uuid'
import { BucketAccess } from '../dataLayer/bucketAccess'
import { TodoAccess } from '../dataLayer/todosAccess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodoAccess()
const bucketAccess = new BucketAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return todoAccess.getAllTodos(userId)
}

export async function createTodo(
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  const todoId = uuid.v4()

  const url = `https://${process.env.IMAGES_S3_BUCKET}.s3.amazonaws.com/${todoId}`

  return await todoAccess.createTodo({
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    name: newTodo.name,
    dueDate: newTodo.dueDate,
    done: false,
    attachmentUrl: url
  })
}

export async function deleteTodo(todoId: string, userId: string) {
  return todoAccess.deleteTodo(todoId, userId)
}

export async function getUploadUrl(todoId: string) {
  const url = await bucketAccess.getUploadUrl(todoId)

  return url
}

export async function updateTodo(
  updatedTodo: UpdateTodoRequest,
  todoId: string,
  userId: string
) {
  return await todoAccess.updateTodo(
    {
      name: updatedTodo.name,
      dueDate: updatedTodo.dueDate,
      done: updatedTodo.done
    },
    todoId,
    userId
  )
}
