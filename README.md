# User Management Backend

This project is a User Management and Role-Based Access Control (RBAC) backend system used to manage users, authentication, and secure access within an application. It includes features like user login, protected routes, role assignment, and user management. The project is designed with a scalable and modular structure for real-world applications. Future improvements include permissions, audit logs, notifications, and advanced security features.

# Tech Stack

1. TypeScript
1. Node.js 
1. Express.js 
1. PostgreSQL 
1. pg (Raw PostgreSQL Driver) 
1. JWT Authentication 
1. bcrypt 
1. Zod Validation 
1. Winston + Morgan Logging

# Features

## Authentication

- User Registration
- User Login 
- JWT Token Generation 
- Password Hashing using bcrypt 
- Protected Routes using JWT Middleware

## User Management

Create User
Get Logged-in User
Get All Users
Get User By ID
Update User
Soft Delete User

## Role Management

Create Roles
Assign Roles to Users
Fetch User Roles
RBAC Foundation

# Validation & Middleware

 Zod Request Validation
Error Handling Middleware
Request Logging
Request ID Tracking
Centralized Response Helper

# Project Setup

### Clone the repository

```bash
git clone <your-repository-url>
cd user_management
```

### Install Dependencies

### Backend

```bash
cd backend
pnpm install
```

## PostgreSQL Database Setup

### Install PostgreSQL

Download and install PostgreSQL from: https://www.postgresql.org/download/?utm_source=chatgpt.com

During installation: Remember your PostgreSQL password

Keep the default port as 5432

### Create Database

Open PostgreSQL Shell (psql) or pgAdmin and run:

```sql
CREATE DATABASE user_management;
```

### Configure Environment Variables

Create a .env file inside the backend folder:

```sql
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=user_management
```

### Run Database Migrations

```bash
cd backend
pnpm run migration:run
```

### Start the Project

Start Backend Server

```bash
cd backend
pnpm run dev
```

### API base

Base URL (dev): http://localhost:5000

All endpoints below are under /api 



