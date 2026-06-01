// Imports the useEffect and useState hooks from React.
import { useEffect, useState } from "react";

// Imports the RequestForm component from the components folder.
import RequestForm from "./components/RequestForm";

// Imports the RequestCard component from the components folder.
import RequestCard from "./components/RequestCard";

// Imports the main CSS file for styling the app.
import "./index.css";

// Defines the main App component for the React application.
function App() {
  // Creates a state variable called requests to store the list of support requests.
  const [requests, setRequests] = useState([]);

  // Creates a state variable called isLoading to track whether the request data is still loading.
  const [isLoading, setIsLoading] = useState(true);

  // Creates a state variable called errorMessage to store any error message from the API.
  const [errorMessage, setErrorMessage] = useState("");

  // Creates a state variable that tracks whether the fake IT staff login is active.
  const [isItStaffLoggedIn, setIsItStaffLoggedIn] = useState(false);

  // Creates a state variable called searchTerm to store what the user types into the search box.
  const [searchTerm, setSearchTerm] = useState("");

  // Creates a state variable called statusFilter to store the selected status filter.
  const [statusFilter, setStatusFilter] = useState("All");

  // Creates a state variable called priorityFilter to store the selected priority filter.
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Creates a state variable called departmentFilter to store the selected department filter.
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // Defines an async function that gets all support requests from the backend.
  async function fetchRequests() {
    // Starts a try block for code that might cause an error.
    try {
      // Sends a GET request to the Express backend API.
      const response = await fetch("http://localhost:5000/api/requests");

      // Checks whether the backend response was unsuccessful.
      if (!response.ok) {
        // Throws an error if the request failed.
        throw new Error("Something went wrong while fetching requests.");
      }

      // Converts the response from JSON into regular JavaScript data.
      const data = await response.json();

      // Saves the request data from the backend into the requests state.
      setRequests(data);
    } catch (error) {
      // Saves the error message so it can be displayed on the page.
      setErrorMessage(error.message);
    } finally {
      // Sets loading to false because the app is done trying to load the data.
      setIsLoading(false);
    }
  }

  // Runs code after the App component first appears on the page.
  useEffect(() => {
    // Calls fetchRequests so the app loads requests from the backend.
    fetchRequests();

    // The empty dependency array means this runs only once when the component first loads.
  }, []);

  // Defines an async function that adds a new support request.
  async function handleAddRequest(newRequestData) {
    // Starts a try block for code that might cause an error.
    try {
      // Sends a POST request to the backend API to create a new request.
      const response = await fetch("http://localhost:5000/api/requests", {
        // Tells the backend that this request is creating new data.
        method: "POST",

        // Provides extra information about the request being sent.
        headers: {
          // Tells the backend that the request body is being sent as JSON.
          "Content-Type": "application/json"
        },

        // Converts the new request data into a JSON string before sending it.
        body: JSON.stringify(newRequestData)
      });

      // Checks whether the backend response was unsuccessful.
      if (!response.ok) {
        // Throws an error if the request could not be created.
        throw new Error("Something went wrong while creating the request.");
      }

      // Converts the created request returned by the backend into JavaScript data.
      const createdRequest = await response.json();

      // Updates the requests state using the most current version of the requests array.
      setRequests((currentRequests) => {
        // Returns a new array that includes all current requests plus the new request.
        return [...currentRequests, createdRequest];
      });
    } catch (error) {
      // Saves the error message so it can be displayed on the page.
      setErrorMessage(error.message);
    }
  }

  // Defines an async function that updates the status of a request.
  async function handleUpdateStatus(id, newStatus) {
    // Starts a try block for code that might cause an error.
    try {
      // Sends a PATCH request to the backend for one specific request using its id.
      const response = await fetch(`http://localhost:5000/api/requests/${id}`, {
        // Tells the backend that this request is updating part of an existing request.
        method: "PATCH",

        // Provides extra information about the data being sent.
        headers: {
          // Tells the backend that the request body is being sent in JSON format.
          "Content-Type": "application/json"
        },

        // Converts the new status into a JSON string before sending it to the backend.
        body: JSON.stringify({ status: newStatus })
      });

      // Checks whether the backend response was unsuccessful.
      if (!response.ok) {
        // Throws an error if the request status could not be updated.
        throw new Error("Something went wrong while updating the request.");
      }

      // Converts the updated request returned by the backend into regular JavaScript data.
      const updatedRequest = await response.json();

      // Updates the requests state using the current list of requests.
      setRequests((currentRequests) => {
        // Loops through the current requests array and returns a new updated array.
        return currentRequests.map((request) => {
          // Checks if the current request's id matches the id of the request that was updated.
          if (request.id === id) {
            // Replaces the old request with the updated request from the backend.
            return updatedRequest;
          }

          // Keeps every other request the same if it was not the one being updated.
          return request;
        });
      });
    } catch (error) {
      // Saves the error message so it can be displayed on the page.
      setErrorMessage(error.message);
    }
  }

  // Defines an async function that deletes a request.
  async function handleDeleteRequest(id) {
    // Shows a browser confirmation popup before deleting the request.
    const confirmDelete = window.confirm(
      // Displays the message inside the confirmation popup.
      "Are you sure you want to delete this request?"
    );

    // Checks if the user clicked Cancel in the confirmation popup.
    if (!confirmDelete) {
      // Stops the function so the request does not get deleted.
      return;
    }

    // Starts a try block for code that might cause an error.
    try {
      // Sends a DELETE request to the backend for one specific request using its id.
      const response = await fetch(`http://localhost:5000/api/requests/${id}`, {
        // Tells the backend that this request should delete data.
        method: "DELETE"
      });

      // Checks whether the backend response was unsuccessful.
      if (!response.ok) {
        // Throws an error if the request could not be deleted.
        throw new Error("Something went wrong while deleting the request.");
      }

      // Updates the requests state using the current list of requests.
      setRequests((currentRequests) => {
        // Returns a new array that removes the request with the matching id.
        return currentRequests.filter((request) => request.id !== id);
      });
    } catch (error) {
      // Saves the error message so it can be displayed on the page.
      setErrorMessage(error.message);
    }
  }

  // Defines a function that switches the app into IT staff dashboard mode.
  function handleItStaffLogin() {
    // Changes isItStaffLoggedIn to true so the dashboard view will appear.
    setIsItStaffLoggedIn(true);
  }

  // Defines a function that switches the app back to the regular staff request page.
  function handleItStaffLogout() {
    // Changes isItStaffLoggedIn to false so the staff request form view will appear.
    setIsItStaffLoggedIn(false);
  }

  // Creates an array of department options for the department filter dropdown.
  const departments = [
    // Adds the All option so the user can view every department.
    "All",

    // Uses Set to remove duplicate department names from the requests array.
    ...new Set(requests.map((request) => request.department))
  ];

  // Creates a new array that only includes requests matching the search and filters.
  const filteredRequests = requests.filter((request) => {
    // Converts the user's search term to lowercase so the search is not case-sensitive.
    const searchText = searchTerm.toLowerCase();

    // Checks whether the search text appears in any important request field.
    const matchesSearch =
      // Checks if the request title includes the search text.
      request.title.toLowerCase().includes(searchText) ||
      // Checks if the request department includes the search text.
      request.department.toLowerCase().includes(searchText) ||
      // Checks if the request type includes the search text.
      request.requestType.toLowerCase().includes(searchText) ||
      // Checks if the request notes include the search text.
      request.notes.toLowerCase().includes(searchText) ||
      // Checks if the submitter's name includes the search text.
      request.submittedBy.toLowerCase().includes(searchText);

    // Checks whether the request matches the selected status filter.
    const matchesStatus =
      // Allows all statuses if the status filter is All, otherwise requires an exact status match.
      statusFilter === "All" || request.status === statusFilter;

    // Checks whether the request matches the selected priority filter.
    const matchesPriority =
      // Allows all priorities if the priority filter is All, otherwise requires an exact priority match.
      priorityFilter === "All" || request.priority === priorityFilter;

    // Checks whether the request matches the selected department filter.
    const matchesDepartment =
      // Allows all departments if the department filter is All, otherwise requires an exact department match.
      departmentFilter === "All" || request.department === departmentFilter;

    // Decides whether this request should stay in the filteredRequests array.
    return (
      // Requires the request to match the search text.
      matchesSearch &&
      // Requires the request to match the selected status filter.
      matchesStatus &&
      // Requires the request to match the selected priority filter.
      matchesPriority &&
      // Requires the request to match the selected department filter.
      matchesDepartment
    );
  });

  // Returns the JSX that will be displayed on the page.
  return (
    // Creates the main container for the entire app.
    <main className="app-container">
      {/* Creates the top hero section of the page. */}
      <section className="hero-section">
        {/* Displays a small label above the main app title. */}
        <p className="eyebrow">Virtual School Internal Tool</p>

        {/* Displays the main app heading. */}
        <h1>Support Request Tracker</h1>

        {/* Displays a short description of what the tool does. */}
        <p className="hero-text">
          Staff can submit classroom tool, tutorial, form, guide, and workflow
          support requests. IT support staff can view and manage submitted
          requests from a separate dashboard.
        </p>
      </section>

      {/* Shows the staff request page only when IT staff is not logged in. */}
      {!isItStaffLoggedIn && (
        // React Fragment lets you return multiple elements without adding an extra div.
        <>
          {/* Creates an introduction section for regular staff users. */}
          <section className="staff-intro-section">
            {/* Groups the staff page heading and instructions together. */}
            <div>
              {/* Displays the heading for the staff request page. */}
              <h2>Staff Request Page</h2>

              {/* Displays instructions for staff members submitting a request. */}
              <p>
                Submit a support request below. Your request will be sent to the
                IT support dashboard for review.
              </p>
            </div>

            {/* Creates a button that lets the user switch to the IT staff dashboard. */}
            <button className="login-button" onClick={handleItStaffLogin}>
              {/* Displays the button text. */}
              IT Staff Login
            </button>
          </section>

          {/* Displays the request form and passes handleAddRequest into it as a prop. */}
          <RequestForm onAddRequest={handleAddRequest} />
        </>
      )}

      {/* Shows the IT staff dashboard only when IT staff is logged in. */}
      {isItStaffLoggedIn && (
        // Creates the dashboard section where IT staff can view requests.
        <section className="dashboard-section">
          {/* Creates the top header area of the dashboard. */}
          <div className="section-header">
            {/* Groups the dashboard label, heading, and description together. */}
            <div>
              {/* Displays a small dashboard label. */}
              <p className="eyebrow dark">IT Staff Dashboard</p>

              {/* Displays the dashboard heading. */}
              <h2>All Support Requests</h2>

              {/* Displays a short explanation of the dashboard purpose. */}
              <p>
                Review submitted requests, track priorities, and manage support
                workflow status.
              </p>
            </div>

            {/* Groups the request count and logout button together. */}
            <div className="dashboard-actions">
              {/* Displays how many requests are showing out of the total number of requests. */}
              <span className="request-count">
                {filteredRequests.length} of {requests.length} requests
              </span>

              {/* Creates a button that logs the IT staff user out of dashboard view. */}
              <button className="logout-button" onClick={handleItStaffLogout}>
                {/* Displays the logout button text. */}
                Log Out
              </button>
            </div>
          </div>

          {/* Shows a loading message only while request data is still loading. */}
          {isLoading && <p className="status-message">Loading requests...</p>}

          {/* Shows an error message only if errorMessage contains text. */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Shows the filters and cards only when loading is finished and there is no error. */}
          {!isLoading && !errorMessage && (
            // React Fragment lets the filter section and request grid sit beside each other.
            <>
              {/* Creates the filter area above the request cards. */}
              <section className="filter-section">
                {/* Creates the search input label. */}
                <label className="search-label">
                  {/* Displays the search label text. */}
                  Search Requests

                  {/* Creates the search text box. */}
                  <input
                    // Sets the input type to text.
                    type="text"
                    // Connects the input value to the searchTerm state variable.
                    value={searchTerm}
                    // Updates searchTerm whenever the user types in the search box.
                    onChange={(event) => setSearchTerm(event.target.value)}
                    // Displays helper text inside the input before the user types.
                    placeholder="Search by title, department, type, notes, or submitter..."
                  />
                </label>

                {/* Creates a container for the dropdown filter controls. */}
                <div className="filter-controls">
                  {/* Creates the status filter label. */}
                  <label>
                    {/* Displays the status filter label text. */}
                    Status

                    {/* Creates the status filter dropdown. */}
                    <select
                      // Connects the dropdown value to the statusFilter state variable.
                      value={statusFilter}
                      // Updates statusFilter whenever the user picks a new status.
                      onChange={(event) => setStatusFilter(event.target.value)}
                    >
                      {/* Allows the user to show all statuses. */}
                      <option value="All">All</option>

                      {/* Allows the user to show only New requests. */}
                      <option value="New">New</option>

                      {/* Allows the user to show only In Progress requests. */}
                      <option value="In Progress">In Progress</option>

                      {/* Allows the user to show only Completed requests. */}
                      <option value="Completed">Completed</option>

                      {/* Allows the user to show only On Hold requests. */}
                      <option value="On Hold">On Hold</option>
                    </select>
                  </label>

                  {/* Creates the priority filter label. */}
                  <label>
                    {/* Displays the priority filter label text. */}
                    Priority

                    {/* Creates the priority filter dropdown. */}
                    <select
                      // Connects the dropdown value to the priorityFilter state variable.
                      value={priorityFilter}
                      // Updates priorityFilter whenever the user picks a new priority.
                      onChange={(event) => setPriorityFilter(event.target.value)}
                    >
                      {/* Allows the user to show all priorities. */}
                      <option value="All">All</option>

                      {/* Allows the user to show only High priority requests. */}
                      <option value="High">High</option>

                      {/* Allows the user to show only Medium priority requests. */}
                      <option value="Medium">Medium</option>

                      {/* Allows the user to show only Low priority requests. */}
                      <option value="Low">Low</option>
                    </select>
                  </label>

                  {/* Creates the department filter label. */}
                  <label>
                    {/* Displays the department filter label text. */}
                    Department

                    {/* Creates the department filter dropdown. */}
                    <select
                      // Connects the dropdown value to the departmentFilter state variable.
                      value={departmentFilter}
                      // Updates departmentFilter whenever the user picks a new department.
                      onChange={(event) =>
                        setDepartmentFilter(event.target.value)
                      }
                    >
                      {/* Loops through the departments array to create one option for each department. */}
                      {departments.map((department) => (
                        // Creates one dropdown option for a department.
                        <option key={department} value={department}>
                          {/* Displays the department name inside the dropdown option. */}
                          {department}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </section>

              {/* Shows a message if no requests match the current filters. */}
              {filteredRequests.length === 0 ? (
                // Displays an empty state message when there are no matching requests.
                <p className="empty-message">
                  No requests match those filters. Try changing your search or
                  filter options.
                </p>
              ) : (
                // Creates one grid container to hold all visible request cards.
                <div className="request-grid">
                  {/* Loops through filteredRequests once and creates one card per request. */}
                  {filteredRequests.map((request) => (
                    // Displays one RequestCard for the current request.
                    <RequestCard
                      // Gives React a unique key for this request card.
                      key={request.id}
                      // Sends the current request object into RequestCard.
                      request={request}
                      // Sends the status update function into RequestCard.
                      onUpdateStatus={handleUpdateStatus}
                      // Sends the delete function into RequestCard.
                      onDeleteRequest={handleDeleteRequest}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}
    </main>
  );
}

// Exports the App component so main.jsx can import and render it.
export default App;