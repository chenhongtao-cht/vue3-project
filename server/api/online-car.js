// 网约车接口
const express = require('express');
const router = express.Router();
const db = require('../db');

// 获取某季度的网约车数据
router.post('/getOnlineCarCompanyInfo', async (req, res) => {
  const { quarter = [], platform } = req.body
  let sql = `SELECT * FROM online_car_data t WHERE t.quarter IN (${quarter.join()})`
  if (platform) { 
    sql += ` AND t.platform = '${platform}'`
  }
  
  try {
    const data = await db(sql)
    res.json({ code: 0, data, message: '查询成功' })
  } catch (e) {
    res.json({ code: -1, data: [], message: e })
  }
})

router.get('/getOnlineCarCompanyInfoByCompany', async (req, res) => {
  const { company } = req.query
  const sql = `SELECT * FROM online_car_data t WHERE t.platform = '${company}'`

  try {
    const data = await db(sql)
    res.json({ code: 0, data, message: '查询成功' })
  } catch (e) {
    res.json({ code: -1, data: [], message: e })
  }
})



module.exports = router;

