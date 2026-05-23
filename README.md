# User Management Backend

A scalable backend authentication and authorization system built using TypeScript, Express.js, and PostgreSQL with JWT authentication, role-based access control (RBAC), validation middleware, and modular architecture. Because apparently humans enjoy building systems just to control which other humans can click which buttons.

# Tech Stack
TypeScript
Node.js
Express.js
PostgreSQL
pg (Raw PostgreSQL Driver)
JWT Authentication
bcrypt
Zod Validation
Winston + Morgan Logging

# Features
 
## Authentication
User Registration
User Login
JWT Token Generation
Password Hashing using bcrypt
Protected Routes using JWT Middleware

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
