require('dotenv').config()
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES = Number(process.env.JWT_EXPIRES) // second
export const MYSQL_URL = process.env.MYSQL_URL