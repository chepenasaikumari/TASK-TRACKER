

function validateTaskPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('Invalid payload.');
    return errors;
  }
  if (!payload.title || String(payload.title).trim().length === 0) {
    errors.push('title is required.');
  }
  if (!payload.due_date || !/^\d{4}-\d{2}-\d{2}$/.test(payload.due_date)) {
    errors.push('due_date is required and must be YYYY-MM-DD.');
  }
  if (payload.priority && !['Low','Medium','High'].includes(payload.priority)) {
    errors.push('priority must be one of Low, Medium, High.');
  }
  if (payload.status && !['Open','In Progress','Done'].includes(payload.status)) {
    errors.push('status must be one of Open, In Progress, Done.');
  }
  return errors;
}

module.exports = { validateTaskPayload };
