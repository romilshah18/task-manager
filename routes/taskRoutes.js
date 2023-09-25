const express = require('express');
const taskController = require('../controllers/taskController');
const { validateCreateTask, validateUpdateTask, validateGetAllTasks } = require('../validations/taskValidations.js');

const router = express.Router();

// Define routes
router.post('/', validateCreateTask, taskController.createTask); // Create a new task
router.put('/:id', validateUpdateTask, taskController.updateTask); // Update a task
router.get('/', validateGetAllTasks, taskController.getAllTasks); // Get all tasks
router.get('/metrics', taskController.getTaskMetrics); // Get task metrics

module.exports = router;
