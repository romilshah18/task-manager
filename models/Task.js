const { Model } = require("objection");

const knex = require("../config/database");
Model.knex(knex);

class Task extends Model {
  static get tableName() {
    return "tasks";
  }
}

module.exports = Task;
