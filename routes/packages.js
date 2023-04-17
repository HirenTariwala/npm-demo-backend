const express = require('express'); //import express

const router  = express.Router(); 
const packageController = require('../controllers/packages'); 
router.get('/packages', packageController.getAllPackages);
router.get('/package/:packageName', packageController.getPackage); 
router.get('/package', packageController.searchPackage);
module.exports = router;