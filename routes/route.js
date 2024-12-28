const express = require('express');
const studentController = require('../controller/studentController');

const courseController = require('../controller/courseController');
const feesController =require('../controller/feesController');
const transactionController = require('../controller/transactionController');
const formController = require('../controller/formController');
const razorpayController=require('../controller/razorpayController')




const router = express.Router();

// **Student Routes**
router.post('/students', studentController.createStudent);  // Create a new student
router.get('/students', studentController.getAllStudents);  
router.get('/students/:studentid', studentController.getStudentById);  



// course details
router.post('/course', courseController.postcourseinfo);   // Create course
router.get('/course', courseController.getcourseinfo);   // Get all courses


// **Fee details**
// router.post('/fee', feesController.addPaymentTransaction);  // Create fee detail
router.get('/fee/:studentid',feesController.calculatePaidFees)
router.get('/fee', feesController.getAllFeeDetails);  // Get all fee details

router.get('/transaction',transactionController.getAllTransactions);
router.post('/transaction',transactionController.createTransaction);
router.get('/transaction/:studentid', transactionController.getStudentById);  


// router.post('/pay', razorpayController.pay);
// router.post('/payverify',razorpayController.payverify);


router.get('/details',formController.getStudentDetails);

module.exports = router;
