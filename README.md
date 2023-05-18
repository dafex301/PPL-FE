# Student Grade Tracker

This repository contains the source code for the Student Grade Tracker, a web application built for a university assignment on the Software Project subject. The application is designed to track students' grades and progress in Universitas Diponegoro. It utilizes Next.js for the frontend and Express.js for the backend.

## Features

The Student Grade Tracker offers the following features:

- **Grade Tracking**: The application allows instructors to record and manage students' grades for various subjects. It provides a user-friendly interface to input and update grades, as well as view overall progress and statistics.

- **Student Progress**: Students can access their personal dashboard to view their grades, track their progress over time, and identify areas that require improvement. The application provides visualizations and insights to help students monitor their academic performance effectively.

## Technologies Used

The Student Grade Tracker is developed using the following technologies:

- Frontend:
  - Next.js: A React-based framework for building server-side rendered and static websites.
  - React: A JavaScript library for building user interfaces.
  - HTML, CSS, and JavaScript: Standard web development technologies for creating interactive web pages.

- Backend:
  - Express.js: A flexible Node.js framework for building web applications and APIs.
  - MongoDB: A popular NoSQL database for storing and retrieving data.

## Installation and Setup

To run the Student Grade Tracker locally, follow these steps:

1. Clone this repository to your local machine.
2. Make sure you have Node.js and npm (Node Package Manager) installed.
3. Install the project dependencies by running the following command in your terminal:
   ```
   npm install
   ```
4. Set up the MongoDB database and obtain the necessary connection credentials.
5. Create a `.env` file in the project root directory and populate it with the MongoDB connection details. You can refer to the `.env.example` file for the required variables.
6. Start the development server by running the following command:
   ```
   npm run dev
   ```
7. Access the application locally in your browser at `http://localhost:3000`.

Please note that the above steps assume you have already set up a MongoDB database and configured it properly. If you haven't done so, please refer to the MongoDB documentation for guidance.

## Deployment

The Student Grade Tracker can be deployed to various hosting platforms that support Next.js applications. Some popular options include Vercel, Netlify, and Heroku.

To deploy the application, follow the hosting platform's instructions for deploying Next.js applications. Make sure to set up the necessary environment variables and configure the MongoDB connection details accordingly.

## Contributing

Contributions to the Student Grade Tracker project are welcome! If you find any issues or want to propose new features, please open an issue in this repository. You can also submit pull requests to contribute directly to the codebase.

When contributing, please follow the existing code style and conventions. Ensure that your changes are well-tested and provide clear documentation.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute the code as per the terms of the license.
