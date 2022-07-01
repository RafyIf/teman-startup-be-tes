import { HttpBadRequest } from '../../utils/error'
import { ApiQuery } from '../../interface/query'
import db from '../../database'

class OrderService {
  async findAll(query: ApiQuery) {
    try {
      let offset = (query.page - 1) * query.limit
      const sql = `SELECT orders.id, json_build_object('full_name',tb_customers.full_name, 'email',tb_customers.email, 'phone',tb_customers.phone, 'address',tb_customers.address) AS customer, COALESCE(tb_order_items.items, '[]') AS items, orders.grand_total FROM tb_orders orders LEFT JOIN LATERAL ( SELECT json_agg(json_build_object('item_id', tb_order_items.id, 'name', tb_products.name,'qty',tb_order_items.qty, 'unit_price', tb_products.price)) AS items FROM tb_order_items LEFT JOIN tb_products ON tb_products.id = tb_order_items.product_id WHERE tb_order_items.order_id = orders.id ) tb_order_items ON true LEFT JOIN LATERAL ( SELECT * FROM tb_customers WHERE tb_customers.id = orders.user_id ) tb_customers ON true ORDER BY orders.date_created ${query.sort} LIMIT ${query.limit} OFFSET ${offset}; SELECT COUNT(tb_orders.id) FROM tb_orders`
      const { count, rows } = await db.findAllAndCount(sql)
      return {
        currentPage: query.page,
        count: count,
        rows: rows,
      }
    } catch (error) {
      throw new HttpBadRequest(error.message)
    }
  }

  async findOne(id: number) {
    try {
      let sql = `SELECT orders.id, json_build_object('full_name',tb_customers.full_name, 'email',tb_customers.email, 'phone',tb_customers.phone, 'address',tb_customers.address) AS customer, COALESCE(tb_order_items.items, '[]') AS items, orders.grand_total FROM tb_orders orders LEFT JOIN LATERAL ( SELECT json_agg(json_build_object('item_id', tb_order_items.id, 'name', tb_products.name,'qty',tb_order_items.qty, 'unit_price', tb_products.price)) AS items FROM tb_order_items LEFT JOIN tb_products ON tb_products.id = tb_order_items.product_id WHERE tb_order_items.order_id = orders.id ) tb_order_items ON true LEFT JOIN LATERAL ( SELECT * FROM tb_customers WHERE tb_customers.id = orders.user_id ) tb_customers ON true WHERE orders.id = $1;`
      const result = await db.query(sql, [id])
      return result.rows[0]
    } catch (error) {
      throw new HttpBadRequest(error.message)
    }
  }
}

export default new OrderService()
