# Personal Finance Tracker

A full-stack personal finance tracker that allows users to log their income and expenses, and visualize their spending habits over time. The application is built with a modern technology stack, offering a secure and scalable solution for managing personal finances.

## Features

* **User Authentication:** Secure sign-up and sign-in functionality using JSON Web Tokens (JWT).
* **Income & Expense Tracking:** Log financial transactions with details like amount, type, category, and date.
* **Data Visualization:** A dynamic bar chart that visualizes spending by category, providing quick insights into spending habits.
* **Transaction History:** View a detailed list of all past transactions.
* **Protected API:** All user-specific data is protected by authentication middleware, ensuring a user can only access their own financial records.

## Technologies Used

### Backend
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web application framework for the API.
* **MongoDB:** NoSQL database for storing user and transaction data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
* **TypeScript:** Superset of JavaScript for type-safe development.
* **bcrypt.js:** Library for hashing passwords.
* **jsonwebtoken:** For creating and verifying JWTs.
* **cors:** Middleware to handle Cross-Origin Resource Sharing.

### Frontend
* **Next.js:** React framework for building the application UI.
* **React:** Frontend library for building the user interface.
* **TypeScript:** For type-safe frontend code.
* **Tailwind CSS:** Utility-first CSS framework for styling.
* **Chart.js:** JavaScript charting library for data visualization.
* **React Chart.js 2:** React wrapper for Chart.js.
* **Axios:** Promise-based HTTP client for API requests.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites
* Node.js (v18 or higher)
* npm (v8 or higher)
* MongoDB (locally or a cloud instance like MongoDB Atlas)

  LIVE LINK : https://finance-tracker-iota-lac.vercel.app/

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shubhamkahar196/FinanceTracker
cd personal-finance-tracker
Step 2: Backend Setup
Navigate to the backend directory and install the dependencies.

Bash

cd backend
npm install
Create a .env file in the backend directory and add your environment variables.

PORT=5000
MONGO_URI="mongodb://localhost:27017/finance-tracker-db"
JWT_SECRET="your_super_secret_jwt_key_here"
Start the backend server.

Bash

npm run dev
The backend API should now be running at http://localhost:5000.

Step 3: Frontend Setup
Open a new terminal, navigate to the frontend directory, and install the dependencies.

Bash

cd ../frontend
npm install
Create a .env.local file in the frontend directory and add the backend API URL.

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
Start the frontend development server.

Bash

npm run dev
The frontend application should now be running at http://localhost:3000.

API Endpoints
The backend API is a RESTful service with the following endpoints:

Endpoint	Method	Description	Access
/api/v1/auth/signup	POST	Registers a new user.	Public
/api/v1/auth/signin	POST	Authenticates a user and returns a JWT.	Public
/api/v1/transactions	POST	Adds a new transaction for the authenticated user.	Private
/api/v1/transactions	GET	Retrieves all transactions for the authenticated user.	Private
/api/v1/transactions/:id	PUT	Updates a specific transaction.	Private
/api/v1/transactions/:id	DELETE	Deletes a specific transaction.	Private




Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.














Tools


