
const db = require('../../db');
const { differenceInCalendarDays, parseISO } = require('date-fns'); 

function getCounts() {
  
  const totalOpen = db.prepare(`SELECT COUNT(*) as cnt FROM tasks WHERE status = 'Open'`).get().cnt;

  
  const byPriorityRows = db.prepare(`SELECT priority, COUNT(*) as cnt FROM tasks GROUP BY priority`).all();
  const byPriority = { High: 0, Medium: 0, Low: 0 };
  byPriorityRows.forEach(r => byPriority[r.priority] = r.cnt);

  
  const now = new Date();
  const nowISO = now.toISOString().slice(0,10); 
  
  const threeAhead = new Date(now);
  threeAhead.setDate(threeAhead.getDate() + 3);
  const threeISO = threeAhead.toISOString().slice(0,10);

  const dueSoonCount = db.prepare(`SELECT COUNT(*) as cnt FROM tasks WHERE due_date BETWEEN ? AND ?`).get(nowISO, threeISO).cnt;

  
  const busyRow = db.prepare(`
    SELECT due_date, COUNT(*) as cnt
    FROM tasks
    WHERE due_date >= ?
    GROUP BY due_date
    ORDER BY cnt DESC, due_date ASC
    LIMIT 1
  `).get(nowISO); // if none, busyRow is undefined

  const busiestDay = busyRow ? { date: busyRow.due_date, count: busyRow.cnt } : null;

  return { totalOpen, byPriority, dueSoonCount, busiestDay };
}

// Generate a readable summary string from the counts
function generateSummary({ totalOpen, byPriority, dueSoonCount, busiestDay }) {
  let summary = `You have ${totalOpen} open task${totalOpen === 1 ? '' : 's'}.`;

  // dominant priority
  const totalPriority = byPriority.High + byPriority.Medium + byPriority.Low;
  if (totalPriority > 0) {
    let dominant = 'Medium';
    const entries = Object.entries(byPriority);
    const [maxPriority, maxCount] = entries.reduce((a,b) => b[1] > a[1] ? b : a, ['Medium', 0]);
    dominant = maxPriority;
    const percent = Math.round((maxCount / totalPriority) * 100);
    summary += ` ${percent}% of your tasks are ${dominant} priority (${maxCount}/${totalPriority}).`;
  }

  if (dueSoonCount > 0) {
    summary += ` ${dueSoonCount} task${dueSoonCount===1?'':'s'} are due within the next 3 days.`;
  } else {
    summary += ` No tasks are due in the next 3 days.`;
  }

  if (busiestDay) {
    summary += ` Busiest day is ${busiestDay.date} with ${busiestDay.count} task${busiestDay.count===1?'':'s'}.`;
  }

  
  if (byPriority.High >= Math.max(byPriority.Medium, byPriority.Low) && dueSoonCount > 0) {
    summary += ` Consider addressing high-priority items due soon first.`;
  } else if (totalOpen > 10) {
    summary += ` You have a long backlog — consider triaging or postponing low-priority tasks.`;
  }

  return summary;
}

function getInsights() {
  const counts = getCounts();
  const summary = generateSummary(counts);
  return { ...counts, summary };
}

module.exports = { getInsights };
