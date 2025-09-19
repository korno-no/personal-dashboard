# Personal Dashboard

A full-stack personal dashboard application built with Angular and Node.js, featuring task management capabilities.

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks
- **Real-time Updates**: Tasks sync between frontend and backend
- **Modern UI**: Clean, responsive design with Angular signals
- **Persistent Storage**: SQLite database for data persistence
- **RESTful API**: Well-structured backend API

## 🏗️ Architecture

### Frontend (Angular)
- **Framework**: Angular 20 with standalone components
- **State Management**: Angular signals for reactive state
- **HTTP Client**: Built-in Angular HTTP client for API communication
- **UI Components**: Custom reusable components

### Backend (Node.js)
- **Runtime**: Node.js with Express.js
- **Database**: SQLite for lightweight data persistence
- **API**: RESTful endpoints for task management
- **CORS**: Configured for frontend integration

## 📁 Project Structure

```
personal-dashboard/
├── src/                    # Angular frontend
│   ├── app/
│   │   ├── core/          # Core services
│   │   ├── features/      # Feature modules (tasks, profile, home)
│   │   ├── layout/        # Layout components
│   │   └── shared/        # Shared components
│   └── assets/            # Static assets
├── backend/               # Node.js backend
│   ├── database/          # Database files and models
│   ├── routes/            # API route handlers
│   └── server.js          # Main server file
└── start-dev.sh          # Development startup script
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-dashboard
   ```

2. **Start development environment**
   ```bash
   ./start-dev.sh
   ```
   This script will:
   - Install all dependencies
   - Start the backend server on port 3001
   - Start the frontend server on port 4200

### Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev  # or npm start for production
```

#### Frontend Setup
```bash
npm install
npm start  # or ng serve
```

## 🌐 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Health Check
- `GET /api/health` - Server health status

## 🎯 Usage

1. **Access the application**: Open `http://localhost:4200` in your browser
2. **Create tasks**: Use the input field to add new tasks
3. **Manage tasks**: Edit, complete, or delete tasks as needed
4. **Persistent storage**: All changes are automatically saved to the database

## 🔧 Development

### Frontend Development
- Uses Angular CLI for development
- Hot reload enabled for development
- TypeScript for type safety
- Angular signals for reactive programming

### Backend Development
- Express.js server with middleware
- SQLite database for development
- RESTful API design
- Error handling and validation

### Database
- SQLite database file: `backend/database/tasks.db`
- Automatically created on first run
- Schema includes tasks table with id, text, isDone, timestamps

## 📦 Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
cd backend
npm install --production
npm start
# Deploy to your server (Heroku, AWS, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository.