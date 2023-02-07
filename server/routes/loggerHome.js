const express = require('express')
const { data, all_log_data } = require('../controller/logController')
const router = express.Router()

//PASSING TO FUNCTION INSIDE CONTROLLER NAMES `logController`
router.route("/all_data").get(data)
router.route("/all_logs").get(all_log_data)


module.exports = router