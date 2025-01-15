# Event Management System

Live: https://n-event-management-system.onrender.com

## Overview
The Event Management System is a full-stack web application designed to simplify the process of organizing and managing events. It allows users to create, view, edit, and delete events, and includes features such as user authentication and a responsive design.

## Features
- User Authentication (JWT-based)
- Event Management (CRUD operations)
- Responsive Design
- Navigation using React Router DOM

## Tech Stack
### Frontend
- React.js
- React Router DOM (Routing)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)

## Installation

### Prerequisites
- Node.js installed on your system
- MongoDB database set up (cloud or local)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Event-management
   ```

2. Install dependencies:
   ```bash
   npm run build
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/event_DB?retryWrites=true&w=majority
   PORT=5050
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
   Replace `<username>` and `<password>` with your MongoDB credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev`: Starts the backend server in development mode using Nodemon.
- `npm run build`: Installs dependencies and builds the frontend.
- `npm start`: Starts the backend server.

## Dependencies
### Production
- `axios`: For making HTTP requests.
- `bcryptjs`: For password hashing.
- `cookie-parser`: To parse cookies in HTTP requests.
- `dotenv`: For environment variable management.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: For token-based authentication.
- `mongoose`: MongoDB object modeling tool.
- `react-router-dom`: For client-side routing.

### Development
- `nodemon`: For automatically restarting the server during development.

## Folder Structure
```
.
├── Backend
│   ├── server.js       # Main server file
│   └── ...             # Other backend files
├── frontend
│   ├── public          # Static assets
│   ├── src             # React application source code
│   └── ...             # Other frontend files
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Environment Variables
- `MONGO_URI`: MongoDB connection string
- `PORT`: Port number for the server (default: 5050)
- `JWT_SECRET`: Secret key for JWT authentication
- `NODE_ENV`: Application environment (e.g., development, production)

## License
This project is licensed under the ISC License.

---

For any issues or contributions, please raise an issue or submit a pull request on the repository.
