<<<<<<< HEAD
# JobApplicationTracker
=======
# Job CRUD Application

This is a full-stack application designed to manage job details. It consists of a React-based frontend and a .NET Core 3.1 Web API backend. The application allows users to create, update, retrieve, and paginate job records. The backend uses an in-memory database seeded with sample data when it starts.

---

## Getting Started

Follow these steps to set up and run both the backend and frontend on your local machine.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v14+ recommended)
- **npm** (comes with Node.js)
- **.NET Core SDK** (v3.1)

---

## Assumptions

The following assumptions have been made for this application:
- The backend uses an in-memory database seeded with sample job data, so no external database configuration is required.
- The backend API exposes the following endpoints:
  - `GET /api/Job/GetJob` - Fetch all job records
  - `POST /api/Job/AddJob` - Add a new job record
  - `PATCH /api/Job/UpdateJob/{id}` - Update an existing job record
  - `GET /api/Job/GetJob/{id}` - Fetch details of a specific job by ID
- The backend runs locally at `https://localhost:44327`.
- The frontend is a React application that consumes the backend API.
- Swagger is enabled on the backend for testing API endpoints.

---

## Running the Backend

1. **Navigate to the backend directory**:
   Open your terminal and navigate to the directory containing the backend project files.

2. **Restore dependencies**:
   Run the following command to install the necessary dependencies:
   ```bash
   dotnet restore

3. Build the project: Build the backend project using the command:
   dotnet build

4. Run the server: Start the backend server with the command:
   dotnet run

5. Access the Swagger API Interface: Once the server is running, open your browser and navigate to:
   https://localhost:44327/swagger
   From the Swagger interface, you can explore and test all available API endpoints interactively.

6. Seed Data:
   When the backend starts, the in-memory database is automatically seeded with sample job data.
   This seed data includes a variety of jobs with details such as company name, position, status, and date applied.
   The data will reset when the backend server restarts.

## Running the Frontend

1. Navigate to the frontend directory: Open your terminal and navigate to the directory containing the React project files.

2. Install dependencies: Install the required Node.js dependencies by running:
   npm install

3. Start the frontend server: Start the React development server using the command:
   npm start

4. Access the application: Open your browser and navigate to http://localhost:3000 to interact with the application.

## Notes on Implementation

1. In-Memory Database with Seed Data:
   The backend is preloaded with sample job data for testing and development.
   The data includes jobs with fields such as company name, position, status, and date applied.
   No external database setup is required.

2. Swagger API Testing:
   Use Swagger to explore, test, and validate the API endpoints.
   The Swagger UI provides comprehensive documentation for all available routes.

3. Frontend Validation:
   Form fields are validated on the client side, ensuring required fields are filled out before submission.
   Errors are displayed inline with visually distinct styles (e.g., red border for invalid fields).

4. Pagination:
   The frontend displays jobs in paginated form, with navigation controls for moving between pages.
   By default, 3 jobs are displayed per page.

5. Bootstrap Styling:
   The application uses Bootstrap for basic styling.

## Troubleshooting

1. Backend Issues:
   Ensure the .NET Core 3.1 SDK is installed and configured properly.
   Confirm that no other applications are using port 44327.

2. Frontend Issues:
   Check that the backend API base URL is correctly configured in the frontend. It should match https://localhost:44327.

3. CORS Issues:
   If you encounter CORS (Cross-Origin Resource Sharing) issues, make sure the backend is configured to allow requests from http://localhost:3000.
>>>>>>> b98215d (Saving my local changes before pull)
