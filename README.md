# User Management Backend

This project is a User Management and Role-Based Access Control (RBAC) backend system used to manage users, authentication, and secure access within an application. It includes features like user login, protected routes, role assignment, and user management. The project is designed with a scalable and modular structure for real-world applications. Future improvements include permissions, audit logs, notifications, and advanced security features.

# Tech Stack

1. TypeScript

2. Node.js 
3. Express.js 
4. PostgreSQL 
5. pg (Raw PostgreSQL Driver) 
6. JWT Authentication 
7. bcrypt 
8. Zod Validation 
9. Winston + Morgan Logging

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