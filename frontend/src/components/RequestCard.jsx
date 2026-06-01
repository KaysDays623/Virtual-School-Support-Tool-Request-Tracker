// This component displays one support request card on the IT dashboard.
function RequestCard({ request, onUpdateStatus, onDeleteRequest }) {
  // Defines a function that runs when the IT staff changes the status dropdown.
  function handleStatusChange(event) {
    // Calls the onUpdateStatus function that was passed down from App.jsx.
    onUpdateStatus(
      // Sends the id of the request that needs to be updated.
      request.id,

      // Sends the new status value selected from the dropdown.
      event.target.value
    );
  }

  // Defines a function that runs when the IT staff clicks the delete button.
  function handleDeleteClick() {
    // Calls the onDeleteRequest function that was passed down from App.jsx.
    onDeleteRequest(
      // Sends the id of the request that should be deleted.
      request.id
    );
  }

  // Returns the JSX that displays one request card on the page.
  return (
    // Creates an article element to represent one support request card.
    <article className="request-card">
      {/* Creates the top row of the card for priority and status. */}
      <div className="card-topline">
        {/* Displays the priority and creates a dynamic CSS class based on the priority value. */}
        <span className={`priority ${request.priority.toLowerCase()}`}>
          {/* Displays the priority text, such as High, Medium, or Low. */}
          {request.priority}
        </span>

        {/* Displays the current status of the request. */}
        <span className="status">{request.status}</span>
      </div>

      {/* Displays the title of the request. */}
      <h3>{request.title}</h3>

      {/* Creates a section for the request details. */}
      <div className="card-details">
        {/* Displays the request's department. */}
        <p>
          {/* Makes the Department label bold. */}
          <strong>Department:</strong> {/* Displays the department value from the request object. */}
          {request.department}
        </p>

        {/* Displays the request's type/category. */}
        <p>
          {/* Makes the Type label bold. */}
          <strong>Type:</strong> {/* Displays the request type value from the request object. */}
          {request.requestType}
        </p>

        {/* Displays the name of the person who submitted the request. */}
        <p>
          {/* Makes the Submitted by label bold. */}
          <strong>Submitted by:</strong> {/* Displays the submittedBy value from the request object. */}
          {request.submittedBy}
        </p>
      </div>

      {/* Displays the notes connected to the request. */}
      <p className="notes">{request.notes}</p>

      {/* Creates the action area at the bottom of the card. */}
      <div className="card-actions">
        {/* Creates a label for the status update dropdown. */}
        <label>
          {/* Displays text explaining what the dropdown does. */}
          Update Status

          {/* Creates a dropdown menu for changing the request status. */}
          <select
            // Sets the currently selected dropdown value to the request's current status.
            value={request.status}

            // Runs handleStatusChange when the user selects a different status.
            onChange={handleStatusChange}
          >
            {/* Creates an option for the New status. */}
            <option value="New">New</option>

            {/* Creates an option for the In Progress status. */}
            <option value="In Progress">In Progress</option>

            {/* Creates an option for the Completed status. */}
            <option value="Completed">Completed</option>

            {/* Creates an option for the On Hold status. */}
            <option value="On Hold">On Hold</option>
          </select>
        </label>

        {/* Creates a button for deleting this request. */}
        <button
          // Adds the delete-button CSS class so this button can be styled.
          className="delete-button"

          // Runs handleDeleteClick when the user clicks the button.
          onClick={handleDeleteClick}
        >
          {/* Displays the button text. */}
          Delete
        </button>
      </div>
    </article>
  );
}

// Makes the RequestCard component available to import and use in other files.
export default RequestCard;