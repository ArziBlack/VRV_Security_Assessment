# Server Documentation

---

## Overview

This project (VRV Security Assessment) is a backend server built using **Node.js** and **Express**, designed to handle API requests, manage database operations, and provide secure communication between the frontend and database.

---

## Features

- **RESTful API**: Fully structured API for seamless frontend integration.
- **Authentication**: JWT-based authentication and role-based access control.
- **Database Integration**: MongoDB (via Mongoose) for efficient data handling.
- **Environment Configuration**: Secure and customizable configurations using `.env`.
- **Error Handling**: Centralized and consistent error management.
- **Scalability**: Built with modular services and middlewares.

---

## Requirements

- **Node.js**: v18.0.0 or later
- **npm**: v10.9.0 or later (or **yarn** as an alternative)
- **MongoDB**: A running instance of MongoDB (local or cloud)

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/ArziBlack/<repository>.git
cd <repository>
```

### Install Dependencies

```bash
npm install
```

---

## Configuration

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Replace placeholders with your actual configuration values.

---

## Usage

### Development Mode

Run the server in development mode with live reloading:

```bash
npm run dev
```

### Production Mode

Start the server in production mode:

```bash
npm start
```

---

## API Endpoints

### Authentication

| Endpoint           | Method | Description              |
| ------------------ | ------ | ------------------------ |
| `/api/auth/signup` | POST   | Register a new user      |
| `/api/auth/login`  | POST   | Authenticate a user      |
| `/api/auth/logout` | GET    | Log out the current user |

### Users

| Endpoint                | Method | Description            |
| ----------------------- | ------ | ---------------------- |
| `/api/users/update/:id` | PUT    | Updates a user profile |

### Admin and Moderator

| Endpoint                | Method | Description                             |
| ----------------------- | ------ | --------------------------------------- |
| `/api/admin/all`        | GET    | Fetches all users profile for admin     |
| `/api/admin/:id/delete` | DELETE | Deletes a user profile (Admin only)     |
| `/api/admin/mod_all`    | GET    | Fetches all users profile for Moderator |
| `/:id/verify`           | GET    | Verifies a user profile for Moderator   |

---

## Folder Structure

```
prisma/
src/
├── config/           # Configuration files
├── controllers/      # Route handlers
├── middlewares/      # Custom middleware functions
├── models/           # Database models
├── routes/           # Route definitions
├── services/         # Business logic
├── utils/            # Utility functions
└── app.js            # App initialization
typings/
.env
.gitignore
nodemon.json
package.json
README.md
tsconfig.json
```

---

## Built With

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **dotenv**: Environment configuration
- **jsonwebtoken**: Token-based authentication
- **bcrypt**: Password hashing

---

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/<feature-name>`).
3. Commit your changes (`git commit -m 'Add <feature>'`).
4. Push to the branch (`git push origin feature/<feature-name>`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

- **Author**: Eghoi Azibapu Milton
- **Email**: eghoiazibapu@gmail.com
- **GitHub**: [MiltonBlack](https://github.com/MiltonBlack)
- **LinkedIn**: [Azibapu Eghoi](https://www.linkedin.com/in/azibapu-eghoi-5379b7240/)

---

This `README.md` provides a solid foundation for any backend server. Feel free to customize it further as needed!
