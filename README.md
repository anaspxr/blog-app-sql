# RBAC Application

This application is a simple Content management system with Role-Based Access Control (RBAC) system that allows you to manage user roles and permissions.

## Features

- **User Management**: Create, update, and delete users.
- **Content Management**: Create, update, and delete the posts (for authors and admins).
- **Role Management**: Define roles and assign them to users.
- **User status Management**: Block, unblock or delete users.
- **Authentication**: Secure login and logout functionality.
- **Authorization**: Restrict access to resources based on user roles and permissions.
- **Search and filters**: Admin can search and filter users based on roles and status
- **Mock Server**: Simulate backend API using `json-server`.

## Installation and starting the dev server

To install the dependencies, run the following commands:

```bash
npm install -g json-server
npm install
```

## Running the Application

In one terminal, run the following command to start the mock server:

```bash
npm run server
```

In another terminal, run the following command to start the development server:

```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Login with your credentials. (You can use the example users data in the data/db.json)
3. Manage users, roles, and permissions through the user interface.

- To test the admin functionalities, you will need to login as an admin. (example: admin@gmail.com, password: admin123)
- To test the author functionalities, you will need to login as an author. (example: aisha.khan@gmail.com, password: password101)
