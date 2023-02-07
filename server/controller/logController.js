const axios = require("axios");
const WhereClause = require("../utils/whereClause");

exports.data = async (req, res) => {
    try {
      const response = await axios.get('https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f');
      res.send(response.data);
      console.log(response.data.result)
    } catch (error) {
      res.status(500).send(error);
    }
  }

exports.all_log_data = async (req, res) => {
    try {
      const resultPerPage = 10;
      const response = await axios.get('https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f');
      const ALL_LOGS = response.data.result.auditLog
      
      const logsObject = new WhereClause(ALL_LOGS,req.query).filter()
      const totalItem = logsObject.base.length
      logsObject?.sort()
      logsObject?.pager(resultPerPage)
      
      logs_paginated = logsObject?.base
      // res.send(logs_paginated);
      res.json({
        totalItem:totalItem,
        logs:logs_paginated
      })

    } catch (error) {
      console.log("error in fetching or filter or sorting",error)
      res.status(500).send(error);
    }
  } 

