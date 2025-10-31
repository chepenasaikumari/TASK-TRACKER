
# Task Tracker Project

# Project Structure
```
task-tracker/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   └── task.model.js
│   │   ├── routes/
│   │   │   ├── tasks.router.js
│   │   │   └── insights.router.js
│   │   ├── controllers/
│   │   │   └── task.controller.js
│   │   └── services/
│   │       └── insight.service.js
│   └── ...
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── Insights.jsx
    │   ├── App.jsx
    │   └── index.css
    └── package.json
```

---

# Environment Setup

# **Backend `.env`**
```
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=task_tracker
DB_DIALECT=mysql
PORT=3000
```

---

# Database Setup

1. Start MySQL:
   ```bash
   mysql -u root -p
   ```

2. Create the database:
   ```sql
   CREATE DATABASE task_tracker;
   ```

3. Sequelize automatically syncs models when you run the backend.

---

# Run Instructions

# **Backend**
```bash
cd backend
npm install
npx nodemon server.js
```

## **Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| ORM | Sequelize |
| Database | MySQL |
| Styling | CSS / Tailwind |
| Tools | Nodemon, dotenv, date-fns |

---

## Features
-> Create, Update, Delete, and View Tasks  
-> Track task completion and status  
-> View task insights by date and progress  
-> Responsive UI with modular components  
-> Persistent data storage using MySQL  

---

# API Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Add a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/insights` | Fetch productivity insights |

---

# Common Commands
| Purpose | Command |
|----------|----------|
| Run backend | `npx nodemon server.js` |
| Run frontend | `npm run dev` |
| Install dependencies | `npm install` |
| Sync database manually | `sequelize.sync()` |

---

# Notes
- Make sure MySQL service is running before starting the backend.  
- If you change the DB credentials, update `.env`.  
- For production, you can use `.env.production` and secure your credentials.  
- Use Postman to test backend routes easily.

---

# Future Improvements
- JWT-based authentication (Admin/User)
- Task priority & due-date reminders
- Analytics dashboard (charts)
- Dark mode toggle

---

# Author

**SAI KUMARI**  
Full Stack Developer — Node.js | React | MySQL  
