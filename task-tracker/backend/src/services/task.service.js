
const db = require('../../db');

function createTask({ title, description = '', priority = 'Medium', due_date, status = 'Open' }) {
  const stmt = db.prepare(`INSERT INTO tasks (title, description, priority, due_date, status) VALUES (?, ?, ?, ?, ?)`);
  const info = stmt.run(title, description, priority, due_date, status);
  return getTaskById(info.lastInsertRowid);
}

function getTaskById(id) {
  return db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id);
}

function buildFilters({ status, priority, sort = 'due_date', order = 'asc' }) {
  const where = [];
  const params = [];
  if (status) { where.push('status = ?'); params.push(status); }
  if (priority) { where.push('priority = ?'); params.push(priority); }
  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const validSort = (sort === 'created_at') ? 'created_at' : 'due_date';
  const validOrder = (order && order.toLowerCase() === 'desc') ? 'DESC' : 'ASC';
  const sql = `SELECT * FROM tasks ${whereClause} ORDER BY ${validSort} ${validOrder}`;
  return { sql, params };
}

function getTasks(filters = {}) {
  const { sql, params } = buildFilters(filters);
  return db.prepare(sql).all(...params);
}

function updateTask(id, fields = {}) {
  const sets = [];
  const params = [];
  if (fields.status) { sets.push('status = ?'); params.push(fields.status); }
  if (fields.priority) { sets.push('priority = ?'); params.push(fields.priority); }
  if (fields.title) { sets.push('title = ?'); params.push(fields.title); }
  if (fields.description) { sets.push('description = ?'); params.push(fields.description); }
  if (fields.due_date) { sets.push('due_date = ?'); params.push(fields.due_date); }
  if (!sets.length) return getTaskById(id);
  params.push(id);
  const sql = `UPDATE tasks SET ${sets.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...params);
  return getTaskById(id);
}

module.exports = { createTask, getTaskById, getTasks, updateTask };
