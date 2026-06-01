# Virtual School Support Request Tracker

Virtual School Support Request Tracker is a full-stack internal-tool-style web application built with React, Node.js, and Express. The app is designed for a virtual K–12 school environment where staff members can submit support requests for classroom tools, parent tutorials, data forms, help guides, and workflow support.

This project was created as a portfolio project to demonstrate full-stack development skills, REST API design, React component structure, CRUD functionality, and user-centered workflow design for a virtual education setting.

## Project Purpose

In a virtual school environment, staff often need quick support tools, tutorials, data trackers, forms, and guides to help students, families, and teachers work more efficiently. This application models a simple internal request tracker where staff can submit support needs and IT/support staff can review and manage those requests from a separate dashboard.

## Features

* Staff request submission page
* Simulated IT staff login
* IT dashboard for viewing submitted requests
* Create new support requests
* View all requests
* Update request status
* Delete requests
* Search requests by title, department, request type, notes, or submitter
* Filter requests by status
* Filter requests by priority
* Filter requests by department
* Dashboard summary cards for request totals
* Responsive internal-tool-style layout
* Fake/sample data only

## Screenshots

### Staff Request Page

![Staff Request Page](screenshots/staff-request-page.png)

### IT Staff Dashboard

![IT Staff Dashboard](screenshots/it-dashboard.png)

### Search and Filters

![Search and Filters](screenshots/filters.png)

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* CORS

### Data

* In-memory sample data
* No database is used in this version

## Project Structure

```txt
virtual-school-support-request-tracker/
│
├── backend/
│   ├── data/
│   │   └── requests.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardSummary.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── RequestCard.jsx
│   │   │   └── RequestForm.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## API Routes

| Method | Route               | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/requests`     | Get all support requests      |
| GET    | `/api/requests/:id` | Get one support request by ID |
| POST   | `/api/requests`     | Create a new support request  |
| PATCH  | `/api/requests/:id` | Update a request status       |
| DELETE | `/api/requests/:id` | Delete a support request      |

## Sample Request Data

The app uses fake/sample request data such as:

* Need a timer tool
* Need a small group tracker
* Need a parent tutorial
* Need a data entry form
* Need help guide

Each request includes:

* Title
* Department
* Request type
* Priority
* Status
* Notes
* Submitted by

## How to Run the Project Locally

This project has a separate backend and frontend. You will need to run both at the same time in two different terminals.

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL_HERE
cd virtual-school-support-request-tracker
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend runs at:

```txt
http://localhost:5000
```

You can test the API at:

```txt
http://localhost:5000/api/requests
```

### 3. Start the frontend

Open a second terminal from the main project folder.

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```txt
http://localhost:5173
```

## Current Version Notes

This version uses in-memory sample data only. Any requests added, updated, or deleted will reset when the backend server restarts.

The IT staff login is simulated with React state. It is not a real authentication system.

## Future Improvements

Possible future improvements include:

* Add a database such as SQLite, PostgreSQL, or MongoDB
* Add real authentication and role-based access
* Add user accounts for staff and IT support
* Add due dates or assigned support staff
* Add request categories and tags
* Add sorting by newest, priority, or status
* Add edit functionality for full request details
* Add request history or activity logs
* Deploy the frontend and backend online

## Portfolio Connection

This project demonstrates skills that align with internal systems and support tool development in a virtual school environment, including:

* Building a full-stack application
* Creating and consuming REST API routes
* Managing React state
* Organizing reusable React components
* Designing a role-based workflow
* Supporting virtual school staff needs
* Creating a user-friendly internal dashboard
* Handling CRUD operations

## Author

Created by Kathleen Sheppard as a portfolio project for virtual school technology and internal systems development.
