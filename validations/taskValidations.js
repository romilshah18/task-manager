const Joi = require('joi');

// Schema for creating a new task
const createTaskSchema = Joi.object({
  title: Joi.string().required(), 
  description: Joi.string().required(), 
  status: Joi.string().valid('open', 'inprogress', 'completed').required(),
});

// Schema for updating an existing task
const updateTaskSchema = Joi.object({
  title: Joi.string(), 
  description: Joi.string(), 
  status: Joi.string().valid('open', 'inprogress', 'completed'), 
});


const getAllTasksSchema = Joi.object({
  page: Joi.number().integer().min(0).default(0),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
/**
 * Middleware to validate the request body for creating a new task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function validateCreateTask(req, res, next) {
  const { error } = createTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

/**
 * Middleware to validate the request body for updating an existing task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function validateUpdateTask(req, res, next) {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}


function validateGetAllTasks(req, res, next) {
  const { error } = getAllTasksSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateGetAllTasks,
};