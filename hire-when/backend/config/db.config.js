import pg from "pg"
const { Pool } = pg

const pool = new Pool({
  user: "postgres",
  password: "258852",
  host: "localhost",
  port: 5432,
  database: "testing",
})

export default pool
