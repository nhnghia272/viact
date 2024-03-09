require('dotenv').config()
export const Constants = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: Number(process.env.JWT_EXPIRES), // second
  MYSQL_URL: process.env.MYSQL_URL,
}