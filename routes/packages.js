const express = require('express'); //import express

const router  = express.Router(); 
const getAllPackages = require('../controllers/packages/getAllPackages'); 
const getPackage = require('../controllers/packages/getPackage'); 
const searchPackage = require('../controllers/packages/searchPackage'); 

router.get('/packages', getAllPackages);
router.get('/package/:packageName', getPackage); 
router.get('/package', searchPackage);

module.exports = router;