const express = require('express');
const studentController = require('../controller/studentController');
const parentController = require('../controller/parentController');
const courseController = require('../controller/courseController');
const feesController =require('../controller/feesController')

const router = express.Router();

// student details
router.post('/addstudent', studentController.studentinfo);
router.get('/viewstudent', studentController.studentinfo);

// course details
router.post('/courses', courseController.courseinfo);   // Create course
router.get('/courses', courseController.courseinfo);   // Get all courses

// parent details
router.post('/parent', parentController.parentinfo);
router.get('/parent', parentController.parentinfo);

// **Fee details**
router.post('/fee', feesController.feeinfo);  // Create fee detail
router.get('/fee', feesController.feeinfo);  // Get all fee details

module.exports = router;
