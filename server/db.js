// 数据库连接配置
//db.js——用来添加 mysql 配置
//根据mysql的IP，端口，用户名，密码，数据库名称自行修改
const mysql = require('mysql')

const db = mysql.createConnection({
  host: '1.12.234.248',
  user: 'cht',
  password: 'Chen_123',
  database: 'cht_demo',
  port:'3306'
})
db.connect()

module.exports = sql => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
    
