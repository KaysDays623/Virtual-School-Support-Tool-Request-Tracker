// Import the Express package so we can create a backend server.
const express = require("express");

// Import the CORS package so our frontend can communicate with our backend.
const cors = require("cors");

// Import our sample request data from the requests.js file inside the data folder.
const requests = require("./data/requests");

// Create an Express application and store it in a variable called app.
const app = express();

// Choose the port number where our backend server will run.
const PORT = 5000;

// -----------------------------
// Middleware
// -----------------------------

// Turn on CORS so other apps, like our React frontend, can make requests to this server.
app.use(cors());

// Tell Express to automatically read incoming JSON data from request bodies.
app.use(express.json());

// -----------------------------
// Temporary in-memory data
// -----------------------------

// Create a changeable copy of the imported sample requests array.
// The spread operator (...) copies the items from requests into a new array.
// This data only exists while the server is running.
let supportRequests = [...requests];

// -----------------------------
// Home route
// -----------------------------

// Create a GET route for the homepage of the API.
// This runs when someone visits http://localhost:5000/
app.get("/", (req, res) => {
  // Send a plain text response back to the browser or frontend.
  res.send("Virtual School Support Request Tracker API is running.");
});

// -----------------------------
// GET all requests
// -----------------------------

// Create a GET route for getting all support requests.
// This runs when someone visits http://localhost:5000/api/requests
app.get("/api/requests", (req, res) => {
  // Send the full supportRequests array back as JSON.
  res.json(supportRequests);
});

// -----------------------------
// GET one request by id
// -----------------------------

// Create a GET route for getting one specific request by its id.
// The :id part is a route parameter, meaning it can change.
// Example: /api/requests/1 or /api/requests/25
app.get("/api/requests/:id", (req, res) => {
  // Get the id from the URL parameters.
  // req.params.id comes in as a string, so Number() turns it into a number.
  const id = Number(req.params.id);

  // Search the supportRequests array for one request whose id matches the URL id.
  const request = supportRequests.find((item) => item.id === id);

  // If no matching request was found, request will be undefined.
  if (!request) {
    // Send a 404 Not Found status and a JSON error message.
    // The return stops the rest of the function from running.
    return res.status(404).json({ message: "Request not found." });
  }

  // If the request was found, send that single request back as JSON.
  res.json(request);
});

// -----------------------------
// POST create a new request
// -----------------------------

// Create a POST route for adding a new support request.
// This runs when the frontend sends new form data to /api/requests.
app.post("/api/requests", (req, res) => {
  // Create a new request object using data from the request body.
  const newRequest = {
    // Create a simple unique id using the current timestamp.
    id: Date.now(),

    // Get the title from the JSON body sent by the frontend.
    title: req.body.title,

    // Get the department from the JSON body sent by the frontend.
    department: req.body.department,

    // Get the request type from the JSON body sent by the frontend.
    requestType: req.body.requestType,

    // Get the priority from the JSON body sent by the frontend.
    priority: req.body.priority,

    // Automatically set every new request's status to "New".
    status: "New",

    // Get the notes from the JSON body sent by the frontend.
    notes: req.body.notes,

    // Get the name of the person who submitted the request from the JSON body.
    submittedBy: req.body.submittedBy
  };

  // Add the new request object to the supportRequests array.
  supportRequests.push(newRequest);

  // Send back a 201 Created status and the new request as JSON.
  res.status(201).json(newRequest);
});

// -----------------------------
// PATCH update request status
// -----------------------------

// Create a PATCH route for updating part of an existing request.
// This route updates the status of one request.
// Example: PATCH /api/requests/3
app.patch("/api/requests/:id", (req, res) => {
  // Get the id from the URL and convert it from a string to a number.
  const id = Number(req.params.id);

  // Find the request in the array that matches the id from the URL.
  const request = supportRequests.find((item) => item.id === id);

  // If no request with that id exists, send a 404 Not Found response.
  if (!request) {
    // Return stops the function so it does not continue.
    return res.status(404).json({ message: "Request not found." });
  }

  // Update the request's status.
  // If req.body.status exists, use it.
  // If req.body.status does not exist, keep the current status.
  request.status = req.body.status || request.status;

  // Send the updated request back as JSON.
  res.json(request);
});

// -----------------------------
// DELETE a request
// -----------------------------

// Create a DELETE route for removing one request.
// Example: DELETE /api/requests/3
app.delete("/api/requests/:id", (req, res) => {
  // Get the id from the URL and convert it from a string to a number.
  const id = Number(req.params.id);

  // Check whether any request in the array has the matching id.
  // some() returns true if at least one item matches.
  const requestExists = supportRequests.some((item) => item.id === id);

  // If no request exists with that id, send a 404 Not Found response.
  if (!requestExists) {
    // Return stops the function so it does not continue to the delete step.
    return res.status(404).json({ message: "Request not found." });
  }

  // Create a new array that keeps every request except the one with the matching id.
  // This effectively deletes the matching request.
  supportRequests = supportRequests.filter((item) => item.id !== id);

  // Send a success message back as JSON.
  res.json({ message: "Request deleted successfully." });
});

// -----------------------------
// Start server
// -----------------------------

// Start the Express server and tell it to listen on the chosen PORT.
app.listen(PORT, () => {
  // Print a message in the terminal when the server starts successfully.
  console.log(`Server is running on http://localhost:${PORT}`);
});