# 🚀 FocusFlow - Task-Centered Pomodoro Productivity Platform

> **CodeCrunch SummerCodeX 2025 Submission**
> Hi Code crunch team! I hope you are doing well. I’ve sent an email as well, but just wanted to clarify here too. For my CodeCrunch submission (FocusFlow), I faced a power outage in India during the final deployment — the build crashed, and I couldn’t get it live in time. The current link (https://focusflow-kohl.vercel.app/) is not working. For judging, please refer to the demo video I made from running my project locally and this commit, which was my last one before the deadline:
https://github.com/prajithravisankar/focusflow/tree/db68a22f97eac601163e7d33271d54fa5e927c18
Thanks so much, and I’m looking forward to your feedback!
**deployment not working for task creation deleting**

FocusFlow is a personal productivity by seamlessly integrating task management with focused work sessions. Unlike traditional to-do apps, FocusFlow bridges the gap between planning and execution by connecting each task directly to time-tracked Pomodoro sessions.

## 🎯 **Key Features**

- **📋 Smart Task Management** - Create, edit, and organize tasks with priorities and due dates
- **🍅 Integrated Pomodoro Timer** - Start focus sessions directly from your tasks
- **📊 Real-Time Analytics** - Track completed tasks and time spent across different periods
- **🔐 Secure Authentication** - User accounts with JWT-based authentication
- **📱 Responsive Design** - Beautiful, modern UI that works on all devices
- **⚡ Real-Time Updates** - Analytics update instantly when you pause/complete sessions

## 🛠️ **Tech Stack**

### Frontend
- **React** - Modern UI library with hooks and context
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js & Express** - Server and API framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd focusflow
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the `backend` folder:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5050
   ```

5. **Start the application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📱 **How to Use FocusFlow**

### 1. **Create Account & Login**
- Register with email and password
- Secure authentication with JWT tokens

### 2. **Manage Your Tasks**
- Add tasks with titles, descriptions, and priorities
- Set due dates and organize by priority levels
- Mark tasks as complete when finished

### 3. **Start Focus Sessions**
- Click "🍅 Start Focus" on any task
- Customize focus/break durations (25/5 min default)
- Pause and resume sessions as needed

### 4. **Track Your Progress**
- View analytics showing tasks completed and time spent
- See breakdowns for today, this week, this month, and this year
- Visual charts and progress indicators

## 📊 **Screenshots & Demo**

### **Video Demo**
https://drive.google.com/file/d/13Ru1woEw_pp_imTuGTi9X200lMYnMGnt/view?usp=drive_link

**Recommended Screenshots to Take:**
1. **Login/Register page** - Show the authentication flow
2. **Dashboard with tasks** - Display task management features
3. **Pomodoro timer running** - Show focus session in progress
4. **Analytics page** - Highlight the data visualization
5. **Mobile responsive view** - Demonstrate mobile compatibility

**Demo Video Should Include:**
1. User registration/login (10 seconds)
2. Creating and managing tasks (20 seconds)
3. Starting a focus session from a task (15 seconds)
4. Pausing/resuming timer (10 seconds)
5. Viewing updated analytics (15 seconds)
6. Navigation between pages (10 seconds)

## 🎨 **Design Highlights**

- **Modern Glassmorphism UI** - Beautiful backdrop-blur effects and gradients
- **Intuitive User Experience** - Seamless flow from task planning to execution
- **Visual Feedback** - Progress bars, animated charts, and status indicators
- **Responsive Design** - Optimized for desktop, tablet, and mobile

## 🏗️ **Architecture**

```
focusflow/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── context/       # React context providers
│   │   └── services/      # API service functions
│   └── package.json
├── backend/           # Node.js API server
│   ├── controllers/   # Request handlers
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth and validation
│   └── package.json
└── README.md
```


## 🤝 **Contributing**

This project was built for CodeCrunch SummerCodeX 2025. The codebase is clean, well-documented, and ready for further development.


## 🏆 **Hackathon Submission**

**Event**: CodeCrunch SummerCodeX 2025  
**Category**: Productivity Tools  
**Submission Date**: July 29, 2025

---

*Built with ❤️ for CodeCrunch SummerCodeX 2025*
