const Task = require('../models/Task');
const { raw, knex } = require('objection');
/**
 * Create a new task.
 * @param {Object} taskData - The data for the new task.
 * @returns {Promise<Object>} - The created task.
 * @throws {Error} - If failed to create task.
 */
async function createTask(taskData) {
  try {
    // Raw Query: insert into `tasks` (`description`, `status`, `title`) values ('Task Description 18', 'completed', 'Task 18')
    const task = await Task.query().insert(taskData);
    return task;
  } catch (error) {
    throw new Error('Failed to create task');
  }
}

/**
 * Update a task.
 * @param {number} id - The ID of the task to update.
 * @param {Object} taskData - The updated data for the task.
 * @returns {Promise<Object>} - The updated task.
 * @throws {Error} - If failed to update task.
 */
async function updateTask(id, taskData) {
  try {
    const taskDataToUpdate = {
      ...taskData,
      updated_at: raw('CURRENT_TIMESTAMP'),
    }
    // Raw Query:update `tasks` set `title` = 'Updated Task 2', `description` = 'Task Decription of 2 updated', `status` = 'completed', `updated_at` = CURRENT_TIMESTAMP where `tasks`.`id` = '2'
    const updatedTask = await Task.query().patchAndFetchById(id, taskDataToUpdate);
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to update task');
  }
}

/**
 * Get all tasks.
 * @returns {Promise<Array<Object>>} - The list of tasks.
 * @throws {Error} - If failed to get tasks.
 */
async function getAllTasks(page, limit) {
  try {
    // Setting default values for page and limit
    if(!page){
      page = 0;
    }
    if(!limit){
      limit = 10;
    }
    // Raw Query: select `id`, `title`, `description` from `tasks` limit 2 offset 6
    const tasks = await Task.query().select('id','title','description','status').page(page, limit);
    return tasks;
  } catch (error) {
    throw new Error('Failed to get tasks');
  }
}

/**
 * Get task metrics.
 * @returns {Promise<Array<Object>>} - The task metrics.
 * @throws {Error} - If failed to get task metrics.
 */
async function getTaskMetrics() {
  try {
    // Raw Query: select DATE_FORMAT(created_at, '%M %Y') as date, COUNT(CASE WHEN status = 'open' THEN 1 END) as open_tasks, COUNT(CASE WHEN status = 'inprogress' THEN 1 END) as inprogress_tasks, COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks from `tasks` group by `date` order by `date` asc
    const taskMetricsByMonth = await Task.query()
      .select(
        raw("DATE_FORMAT(created_at, '%M %Y') as date"),
        raw("COUNT(CASE WHEN status = 'open' THEN 1 END) as open_tasks"),
        raw("COUNT(CASE WHEN status = 'inprogress' THEN 1 END) as inprogress_tasks"),
        raw("COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks")
      )
      .groupBy('date',)
      .orderBy('date', 'asc');
    const metrics = [];
    taskMetricsByMonth.forEach((taskMetric) => {
      const { date, open_tasks, inprogress_tasks, completed_tasks } = taskMetric;
      metrics.push({
        date,
        metrics: {
          open_tasks,
          inprogress_tasks,
          completed_tasks,
        }
      });
    });

    return metrics;
  } catch (error) {
    throw new Error('Failed to get task metrics');
  }
}

module.exports = {
  createTask,
  updateTask,
  getAllTasks,
  getTaskMetrics,
};
