const express = require('express');
const studentController = require('../controller/studentController');
const courseController = require('../controller/courseController');
const feesController = require('../controller/feesController');
const transactionController = require('../controller/transactionController');
const formController = require('../controller/formController');
const razorpayController = require('../controller/razorpayController');

const router = express.Router();

// **Student Routes**
router.post('/students', studentController.createStudent); // Create a new student
router.get('/students', studentController.getAllStudents); // Get all students
router.get('/students/:studentid', studentController.getStudentById); // Get student by ID

// **Course Routes**
router.post('/course', courseController.postcourseinfo); // Create a new course
router.get('/course', courseController.getcourseinfo); // Get all courses

// **Fee Routes**
router.get('/fee/:studentid', feesController.calculatePaidFees); // Calculate paid fees for a student
router.get('/fee', feesController.getAllFeeDetails); // Get all fee details

// **Transaction Routes**
router.get('/transaction', transactionController.getAllTransactions); // Get all transactions
router.post('/transaction', transactionController.createTransaction); // Create a new transaction
router.get('/transaction/:studentid', transactionController.getTransactionsByStudentId); // Get transactions by student ID

// **Razorpay Routes**
// Uncomment these lines if Razorpay integration is active
// router.post('/pay', razorpayController.pay);
// router.post('/payverify', razorpayController.payverify);

// **Form Routes**
router.get('/details', formController.getStudentDetails); // Get student and course details

module.exports = router;
