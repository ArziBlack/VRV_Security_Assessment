# Frontend README for User Management App

## Overview

This project is a React-based frontend for a user management platform, utilizing modern technologies such as TypeScript, React Router, Zustand for state management, and Chakra UI for the design system. The app features a secure authentication flow and user role management system, with routes and actions differentiated for users, moderators, and admins.

## Key Features

- **Authentication**: Users can sign up, sign in, and log out.
- **User Role Management**: Differentiated views and actions for users, moderators, and admins.
- **Profile Management**: Users can view and edit their profile, while moderators and admins can manage users.
- **Routing**: Role-based routing ensures that each user type only accesses permitted routes.
- **Data Table**: Admins can view and manage users using data tables.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that provides static typing.
- **Zustand**: A state management library to handle authentication and admin user data.
- **Chakra UI**: A component library for building accessible and reusable components.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router**: A routing library for navigation between pages.
- **Tailwind CSS**: A utility-first CSS framework for styling the app.

## Folder Structure

```
src/
├── components/       # Reusable UI components
├── interfaces/       # TypeScript interfaces for API responses and state management
├── pages/            # Page components for routing
├── utils/            # Utility functions and helpers
├── views/            # View components for user data and profile management
└── App.css           # Global styles
```

1. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Authentication Flow

- **Signup**: Users can sign up via the `/signup` route. The user data is stored in the state, and a JWT token is saved in the session storage upon successful signup.
- **Signin**: Users can sign in via the `/signin` route. Upon successful authentication, the JWT token and user data are stored in session storage.
- **Protected Routes**: Some routes (e.g., `/admin`, `/users`) are protected and require users to be authenticated. These routes are accessible only to users with specific roles (admin/moderator).

## Routing Structure

The routing is managed using React Router. Below is a summary of the main routes:

- **/signin**: Sign-in page for users.
- **/signup**: Sign-up page for new users.
- **/**: Base route where users and moderators can view their profiles.
- **/admin**: Admin dashboard, accessible only by users with the admin role. Admins can view their profile here.
- **/users**: Accessible by moderators and users, to view their own profiles.
- **/admin/users**: Admins can view and manage all users from this route.

### Role-Based Routing

- **Users**: Can only view their profile at the base route (`/`).
- **Moderators**: Can view the profile and verify users via `/users`.
- **Admins**: Have full access, including managing all users via `/admin` and deleting users via `/admin/users`.

## Authentication Store (Zustand)

The app uses **Zustand** for global state management. The authentication state is stored in a central store, where the following states and actions are managed:

- **State**:

  - `user`: Stores the current user object.
  - `isAuthenticated`: A boolean indicating if the user is logged in.
  - `isSignedup`: A boolean indicating if the user has signed up successfully.
  - `error`: Stores any errors related to authentication.

- **Actions**:
  - `signup`: Registers a new user by sending the request to the backend.
  - `signin`: Logs in the user and stores the token and user data.
  - `logout`: Logs out the user and clears session data.
  - `update_profile`: Updates user profile details.

## Admin Store (Zustand)

The **Admin Store** handles the management of user data for admins. It includes the following:

- **State**:

  - `users`: Stores a list of users fetched from the API.
  - `loading`: A boolean indicating if the user data is being fetched.
  - `error`: Stores any errors related to fetching or managing users.

- **Actions**:
  - `getAllUsers`: Fetches all users for admin view.
  - `getModAllUsers`: Fetches all users for moderator view.
  - `verifyUser`: Allows a moderator to verify a user.
  - `deleteUser`: Allows an admin to delete a user.

## API Endpoints

The app communicates with a backend API. Here are the main endpoints used:

- **POST `/api/v1/auth/signup`**: User signup.
- **POST `/api/v1/auth/signin`**: User sign-in.
- **GET `/api/v1/auth/logout`**: Logs out the current user.
- **GET `/api/v1/admin/all`**: Fetches all users (Admin only).
- **GET `/api/v1/admin/mod_all`**: Fetches users (Moderator only).
- **GET `/api/v1/admin/:id/verify`**: Verifies a user (Moderator only).
- **DELETE `/api/v1/admin/:id/delete`**: Deletes a user (Admin only).

## Development

### Scripts

- **dev**: Runs the development server using Vite.

  ```bash
  npm run dev
  ```

- **build**: Builds the app for production.

  ```bash
  npm run build
  ```

- **lint**: Lints the project using ESLint.

  ```bash
  npm run lint
  ```

- **preview**: Previews the production build.

  ```bash
  npm run preview
  ```

## Conclusion

This project provides a robust structure for a user management platform, supporting secure authentication, role-based access control, and efficient user management using Zustand. With Chakra UI for design and React Router for navigation, it delivers a modern and scalable solution for managing user data in an admin-controlled system.
