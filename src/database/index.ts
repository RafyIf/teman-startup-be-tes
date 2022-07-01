import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
})

export default {
  async query(sql: string, params: any[] = []) {
    try {
      const result = await pool.query(sql, params)
      return result
    } catch (error) {
      throw error
    }
  },
  async findAllAndCount(sql: string, params: any[] = []) {
    try {
      const [
        { rows },
        {
          rows: [it],
        },
      ]: any = await pool.query(sql, params)
      return { rows, count: Number(it.count) }
    } catch (error) {
      throw error
    }
  },
}
