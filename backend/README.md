# Personal Dashboard Backend

A Node.js backend API for the Personal Dashboard application.

## Features

- RESTful API for task management
- SQLite database for data persistence
- CORS enabled for frontend integration
- Error handling and validation

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Health Check
- `GET /api/health` - Server health status

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Or start the production server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3001`

## Database

The application uses SQLite for data persistence. The database file (`tasks.db`) will be created automatically in the `database/` directory on first run.

## Environment Variables

- `PORT` - Server port (default: 3001)
