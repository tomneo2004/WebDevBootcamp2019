const express = require('express');
const router = express.Router();
const image = require('../controllers/image');

router.put('/', (req, res)=>{image.handleImage(req, res, req.appConfig.db)})

router.post('/detectface', (req, res)=>{image.handleAPICall(req, res)})

module.exports = router;