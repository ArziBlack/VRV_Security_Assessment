## VRV Security Assessment

### Project Overview

The assessment project is structured as a monorepo containing two main directories: **client** (frontend application) and **server** (backend application). Here's an overview of each part of the application:

---

### **Frontend (Client)**

#### **Description**

The frontend application is located in the `client` folder. It is a modern web application built using **React.js** and styled with TailwindCSS, some Chakra UI components were also used. The client interacts with the backend to perform CRUD operations and handle authentication flows.

For more details on how the Backend server works, navigate into the server folder and read the README.md for further insights.

#### **Key Features**

- **User Management:**  
  Allows users to view and interact with their profiles, including fields like name, email, and verification status.
- **Dynamic Data Fetching:**  
  Implements paginated APIs for user lists and manages state using `useState`, `useEffect` hooks and `zustand`.
- **Form Handling:**  
  Features logic for user input validation. Example: The areas of focus dropdown with dynamic `onChange` handling.
- **Theming:**  
  Provides light and dark modes for user experience improvement, styled using TailwindCSS's utility classes.
- **API Integration:**  
  Communicates with the backend to retrieve and display data, such as verified and unverified users.

#### **Dependencies**

- **React.js:** For building the user interface.
- **Axios:** For handling HTTP requests.
- **TailwindCSS:** For styling.
- **React Router Dom:** For navigation and routing between pages.
- **React Icons:** For Icons

---

### **Backend (Server)**

#### **Description**

The backend application resides in the `server` folder and serves as the core API layer. It is built using **Node.js** with **Express.js** as the web framework and **Prisma** as the ORM for database operations and **Postgresql**. The server implements key business logic for user authentication, authorization, and management.

For more details on how the Backend server works, navigate into the server folder and read the README.md for further insights.

#### **Key Features**

- **Authentication and Authorization:**
  - Utilizes **JWT** (JSON Web Tokens) for user authentication.
  - Role-based access control (`ADMIN`, `MEMBER`, `SECURITY_ANALYST`) is implemented, ensuring secure endpoints.
- **Database Management:**
  - Models user data with Prisma, using PostgreSQL as the database.
  - Includes fields like `isVerified`, `role`, `country`, `phone`, etc., to handle user details comprehensively.
  - Provides endpoints to fetch, create, update, and verify users.
- **Unverified Users:**
  - A dedicated API endpoint filters unverified users (`isVerified: false`).
- **Validation:**
  - Middleware verifies the authenticity of requests and user roles.
  - Input validation ensures only valid data is accepted in the API requests.
- **Error Handling:**  
  Graceful error handling middleware is integrated to capture and respond to any issues consistently.

#### **Dependencies**

- **Express.js:** For building RESTful APIs.
- **Prisma:** For ORM and database schema management.
- **JWT:** For authentication.
- **bcrypt:** For password hashing and security.
- **http-status:** For consistent HTTP status codes.

---

### **Root Folder**

#### **Files**

1. **`.gitignore`:** Specifies files and folders (e.g., `node_modules`, `.env`, and build artifacts) to exclude from version control.
2. **`README.md`:** Documentation providing an overview of the project, setup instructions, and usage details.

---

### **How to Run**

#### **Backend (Server)**

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file:
   - Configure `DATABASE_URL` for PostgreSQL. (default sample `postgresql://username:password@localhost:5432/vrv?schema=public`)
   - Add `JWT_SECRET` for token generation.
   - Add `PORT` as localserver port (default `3000`)
   - Add `JWT_EXPIRY` for token expiration time. (default `30d`)
   - Add `BCRYPT_ROUND` for password hashing
4. Apply migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm start
   ```

#### **Frontend (Client)**

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the application at [http://localhost:5173](http://localhost:3000).

---

This is a structured approach that ensures separation of concerns and allows seamless development, and deployment. The project demonstrates full-stack expertise by combining frontend design, backend logic, and database management.
