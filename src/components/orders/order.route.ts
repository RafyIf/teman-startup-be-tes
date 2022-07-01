import express, { Router } from 'express'
import orderService from './order.service'
import { SuccessResponse } from '../../utils/message'

const routes = Router()

routes.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const data = await orderService.findAll({
        page: Number(req.query?.page || 1),
        limit: Number(req.query?.limit || 10),
        search: String(req.query?.search || ''),
        sort: String(req.query?.sort || 'DESC'),
      })
      res.json(new SuccessResponse(data))
    } catch (error) {
      return next(error)
    }
  },
)

routes.get(
  '/:id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const data = await orderService.findOne(Number(req.params.id))
      res.json(new SuccessResponse(data))
    } catch (error) {
      return next(error)
    }
  },
)

export default routes
