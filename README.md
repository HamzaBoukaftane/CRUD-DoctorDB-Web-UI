# CRUD-DoctorDB-Web-UI

## Building a CRUD App with Angular, Express, and PostgreSQL

This repository provides a foundation for building a CRUD (Create, Read, Update, Delete) application using Angular for the frontend, Express.js for the backend API, and PostgreSQL for the database.

**Features:**

* **Create:** Add new data entries to your database.
* **Read:** Retrieve and display existing data entries.
* **Update:** Modify existing data entries.
* **Delete:** Remove data entries from your database.

**Tech Stack:**

* **Frontend:** Angular
* **Backend:** Express.js
* **Database:** PostgreSQL

**Getting Started:**

Before embarking on this project, ensure you have the following prerequisites:

  * **Node.js and npm (or yarn):** Download and install Node.js from [https://nodejs.org/en](https://nodejs.org/en) (includes npm). Alternatively, use a package manager like yarn ([https://classic.yarnpkg.com/lang/en/docs/install/](https://classic.yarnpkg.com/lang/en/docs/install/)).
  * **PostgreSQL:** Install PostgreSQL from the official documentation ([https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)).
  * **Angular CLI:** Install Angular CLI globally using `npm install -g @angular/cli` (or `yarn global add @angular/cli`).

**Project Setup:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/<your-username>/angular-express-postgres-crud.git
   ```

2. **Install Dependencies:**

   ```bash
   cd CRUD-DoctorDB-Web-UI
   npm install  # or yarn install
   ```

3. **Configure PostgreSQL Database:**

   * Set up a PostgreSQL database and create a user with appropriate permissions. Refer to the PostgreSQL documentation for detailed instructions.
   * Update the `database.service.ts` file with your database connection details, including host, port, database name, username, and password.

   ```typescript
    public connectionConfig: pg.ConnectionConfig = {
        user: "your-user",
        database: "your-db-name",
        password: "your-password",
        port: 5433,
        host: "127.0.0.1",
        keepAlive: true
    };
   ```

4. **Run the Backend Server:**

   ```bash
   cd server
   npm start  # or yarn start
   ```

   This starts the Express.js server, typically listening on port `3000` by default (you can check the code for the exact port).

5. **Run the Angular App:**

   ```bash
   cd client
   ng serve  # This starts the development server
   ```

   This starts the Angular development server, usually accessible at `http://localhost:4200/` in your browser.

**Code Structure:**

The repository will have separate directories for the frontend (Angular) and backend (Express.js). Each directory will have its own code structure for managing components, services, routes, and database interactions.

**Next Steps:**

* Explore the code within the `frontend` and `backend` directories to understand how data is fetched, displayed, manipulated, and persisted in the database.
* Customize the application to manage a specific type of data (e.g., tasks, products, users).
* Implement additional features like user authentication, authorization, or data visualization.

**Additional Resources:**

* Angular Tutorial: [https://angular.io/tutorial](https://angular.io/tutorial)
* Express.js Guide: [https://expressjs.com/](https://expressjs.com/)
* PostgreSQL Tutorial: [https://www.postgresqltutorial.com/](https://www.postgresqltutorial.com/)

**Remember:** This is a starting point. Feel free to modify, extend, and customize the application to suit your specific needs. Happy building!