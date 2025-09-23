#motion admin

A modern dashboard application built with Next.js, React, Tailwind CSS,Shadcn and Docker.
This project demonstrates authentication, protected routes, role-based UI, CRUD operations, and data visualization — designed as part of an interview assignment.

#Features

 Authentication & Protected Routes – Redirect users to login if not authenticated.
 Dashboard with Stats – Fetches mock API data and displays them using charts and tables.
 CRUD Operations – Create, Read, Update, Delete for resources (Users).
 Table Enhancements – Filtering, sorting, and searching functionality.
 Profile Page – Update user profile 
 Role-Based UI – Different views for Admin and Normal User.
 Dockerized Application – Run easily with Docker for consistent environment setup.

 #Tech Stack

Framework: Next.js
Language: TypeScript / JavaScript
Styling: Tailwind CSS
UI Components: Shadcn UI
Charts: BarChart, LineChart, PieChart
State Management: React Hooks / Context API
Auth: Custom Hook
Mock API: custom mock data
Containerization: Docker & Docker Compose

#Getting Started 
git clone https://github.com/FayzulIslamFaisal/motion-admin.git
#Install dependencies (without Docker)
npm install
npm run dev

#Run with Docker
docker-compose up --build

