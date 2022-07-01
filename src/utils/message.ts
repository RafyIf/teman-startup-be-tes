export class SuccessResponse {
  status: string
  message: string
  data: any
  constructor(data: any, message: string = null) {
    this.status = 'ok'
    this.message = message
    this.data = data
  }
}
