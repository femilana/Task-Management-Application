const express = require('express');
const multer = require('multer');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require("../middleware/auth");

const router = express.Router();

// ⚡ Use memory storage (no local uploads folder needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Protect all task routes
router.use(protect);

router.post('/create-task', upload.single('image'), createTask);
router.get('/get-task', getTasks);
router.put('/update-task/:id', upload.single('image'), updateTask);
router.delete('/delete-task/:id', deleteTask);

module.exports = router;
