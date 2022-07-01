import { Request, Response, NextFunction } from 'express'

export enum statusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422,
}

interface BaseError {
  message: any
  name: string
  statusCode: number
  data: any
  isOperational?: boolean
}

class HttpError extends Error {
  statusCode: number
  data: any
  name: string
  constructor(erros: BaseError) {
    super(erros.message)
    this.name = erros.name
    this.statusCode = erros.statusCode
    this.data = erros.data
    Error.captureStackTrace(this, HttpError)
  }
}

export class HttpBadRequest extends HttpError {
  constructor(message = 'Bad request', data: any = null) {
    super({
      message,
      name: 'HttpBadRequest',
      statusCode: statusCode.BAD_REQUEST,
      data,
    })
  }
}

export class HttpUnauthorized extends HttpError {
  constructor(message = 'Unauthorized', data: any = null) {
    super({
      message,
      name: 'HttpUnauthorized',
      statusCode: statusCode.UNAUTHORIZED,
      data,
    })
  }
}

export class HttpForbidden extends HttpError {
  constructor(message = 'Forbidden', data: any = null) {
    super({
      message,
      name: 'HttpForbidden',
      data,
      statusCode: statusCode.FORBIDDEN,
    })
  }
}

export class HttpNotFound extends HttpError {
  constructor(message = 'Not Found', data: any = null) {
    super({
      message,
      name: 'HttpNotFound',
      statusCode: statusCode.NOT_FOUND,
      data,
    })
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(message = 'Internal server error', data: any = null) {
    super({
      message,
      name: 'HttpInternalServerError',
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      data,
      isOperational: false,
    })
  }
}

export default function errorMiddleware(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(error.statusCode || statusCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    message: error.message || 'Something went wrong',
    data: error.data || null,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  })
}
