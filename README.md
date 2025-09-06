✅ Task Management Application – Backend
📖 Description

This project is a backend API for a task management (to-do) application.
It allows users to create, read, update, and delete tasks. Each task can be categorized, assigned a deadline, and marked as complete or incomplete.

Users must register and log in to manage their own tasks.

🚀 Features

🔐 User authentication – Secure registration and login with JWT

📝 CRUD operations for tasks – Create, Read, Update, Delete

🗂️ Task categorization – Assign tasks to categories

⏳ Deadlines – Set due dates for tasks

✅ Completion tracking – Mark tasks as complete or incomplete

👤 User-specific tasks – Each user can only manage their own tasks

🛠️ Tech Stack

Backend Framework: Node.js + Express

Database: MongoDB (with Mongoose ODM)

Authentication: JSON Web Token (JWT)

Password Security: bcrypt.js

Environment Variables: dotenv

Validation: express-validator

📂 Project Structure
task-management-backend/
│-- config/          # Database connection
│-- controllers/     # Business logic for auth & tasks
│-- middleware/      # Auth & error handling
│-- models/          # Mongoose models (User, Task)
│-- routes/          # API routes (auth & tasks)
│-- utils/           # Helper utilities
│-- .env             # Environment variables
│-- server.js        # Entry point

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/yourusername/task-management-backend.git
cd task-management-backend

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the server
npm start

📌 API Endpoints
🔐 Auth Routes

POST /api/auth/register – Register a new user

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}


POST /api/auth/login – Login & get JWT

{
  "email": "john@example.com",
  "password": "password123"
}

📝 Task Routes (Protected – require JWT token)

POST /api/tasks/create-task – Create a task

{
  "title": "Finish assignment",
  "description": "Complete backend project",
  "category": "Work",
  "deadline": "2025-09-20",
  "completed": false
}


GET /api/tasks/get-task – Get all tasks for logged-in user

PUT /api/tasks/update-task/:id – Update a task

{
  "title": "Finish assignment (updated)",
  "completed": true
}


DELETE /api/tasks/delete-task/:id – Delete a task

👥 User Roles

User – Can only manage their own tasks

(Optional Future) Admin – Can manage all users’ tasks

📌 Future Improvements

📅 Task reminders & notifications

📊 Task priority levels (High, Medium, Low)

📱 Frontend integration (React, Vue, or Angular)

☁️ File upload support for tasks (attachments)

⚡ This backend is designed to be scalable and extendable – you can plug it into a frontend (React/Next.js, mobile app, etc.) or even expose it as a public API.
