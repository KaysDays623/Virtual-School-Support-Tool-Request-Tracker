// This stores the base URL for the backend request API.
const API_URL = "http://localhost:5000/api/requests";

// This function gets all support requests from the backend.
export async function getRequests() {
  // This sends a GET request to the backend API.
  const response = await fetch(API_URL);

  // This checks if the backend response was not successful.
  if (!response.ok) {
    // This creates an error message if the request failed.
    throw new Error("Something went wrong while fetching requests.");
  }

  // This turns the JSON response into regular JavaScript data and returns it.
  return response.json();
}

// This function sends a new support request to the backend.
export async function createRequest(newRequestData) {
  // This sends a POST request to the backend API.
  const response = await fetch(API_URL, {
    // This tells the backend that we are creating new data.
    method: "POST",

    // This tells the backend that we are sending JSON.
    headers: {
      // This sets the request content type to JSON.
      "Content-Type": "application/json"
    },

    // This converts the new request object into a JSON string.
    body: JSON.stringify(newRequestData)
  });

  // This checks if the backend response was not successful.
  if (!response.ok) {
    // This creates an error message if the create request failed.
    throw new Error("Something went wrong while creating the request.");
  }

  // This turns the created request response into JavaScript data and returns it.
  return response.json();
}

// This function updates the status of one support request.
export async function updateRequestStatus(id, newStatus) {
  // This sends a PATCH request to update one request by id.
  const response = await fetch(`${API_URL}/${id}`, {
    // This tells the backend that we are updating part of the request.
    method: "PATCH",

    // This tells the backend that we are sending JSON.
    headers: {
      // This sets the request content type to JSON.
      "Content-Type": "application/json"
    },

    // This sends the new status as JSON.
    body: JSON.stringify({ status: newStatus })
  });

  // This checks if the backend response was not successful.
  if (!response.ok) {
    // This creates an error message if the update request failed.
    throw new Error("Something went wrong while updating the request.");
  }

  // This turns the updated request response into JavaScript data and returns it.
  return response.json();
}

// This function deletes one support request from the backend.
export async function deleteRequest(id) {
  // This sends a DELETE request to the backend API for one request by id.
  const response = await fetch(`${API_URL}/${id}`, {
    // This tells the backend that we want to delete this request.
    method: "DELETE"
  });

  // This checks if the backend response was not successful.
  if (!response.ok) {
    // This creates an error message if the delete request failed.
    throw new Error("Something went wrong while deleting the request.");
  }

  // This turns the delete response into JavaScript data and returns it.
  return response.json();
}