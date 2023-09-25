const Task = require('../models/Task');
const TaskService = require('../services/taskService');

// Create a new task
async function createTask(req, res) {
  try {
    const task = await TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a task
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const updatedTask = await TaskService.updateTask(id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all tasks
async function getAllTasks(req, res) {
  try {
    const { page, limit } = req.query;
    const tasks = await TaskService.getAllTasks(page, limit);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get task metrics
async function getTaskMetrics(req, res) {
  try {
    const taskMetrics = await TaskService.getTaskMetrics();
    res.json(taskMetrics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createTask,
  updateTask,
  getAllTasks,
  getTaskMetrics,
};