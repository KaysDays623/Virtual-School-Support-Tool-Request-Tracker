// Import useState from React.
// useState lets this component remember and update form input values.
import { useState } from "react";

// Create a React component named RequestForm.
// This component receives a prop called onAddRequest from its parent component.
// onAddRequest is a function that will run when the form is submitted successfully.
function RequestForm({ onAddRequest }) {
  // Create a state variable called formData.
  // formData stores all of the values currently typed or selected in the form.
  // setFormData is the function used to update formData.
  const [formData, setFormData] = useState({
    // The request title starts as an empty string.
    title: "",

    // The department starts as an empty string.
    department: "",

    // The request type starts as an empty string because the user has not selected one yet.
    requestType: "",

    // The priority starts as "Medium" by default.
    priority: "Medium",

    // The notes field starts as an empty string.
    notes: "",

    // The submittedBy field starts as an empty string.
    submittedBy: ""
  });

  // Create a function named handleChange.
  // This function runs every time the user types in an input or changes a select menu.
  function handleChange(event) {
    // Get the name and value from the input/select that triggered the change.
    // event.target means the specific form element the user interacted with.
    // name tells us which field changed, like "title" or "department".
    // value tells us what the new value is.
    const { name, value } = event.target;

    // Update the formData state.
    // currentData represents the current version of formData before the update.
    setFormData((currentData) => {
      // Return a new object to replace the old formData object.
      return {
        // Copy all existing formData values so we do not erase the other fields.
        ...currentData,

        // Update only the field that matches the input's name.
        // Example: if name is "title", this updates formData.title.
        // Example: if name is "department", this updates formData.department.
        [name]: value
      };
    });
  }

  // Create a function named handleSubmit.
  // This function runs when the user submits the form.
  function handleSubmit(event) {
    // Prevent the browser's default form behavior.
    // Without this, the page would refresh when the form is submitted.
    event.preventDefault();

    // Check whether any required fields are empty.
    // The ! means "not" or "missing."
    if (
      // Check if the title field is empty.
      !formData.title ||

      // Check if the department field is empty.
      !formData.department ||

      // Check if the requestType field is empty.
      !formData.requestType ||

      // Check if the notes field is empty.
      !formData.notes ||

      // Check if the submittedBy field is empty.
      !formData.submittedBy
    ) {
      // Show an alert message if any required field is missing.
      alert("Please fill out all fields before submitting.");

      // Stop the function here so the request does not get submitted.
      return;
    }

    // Call the onAddRequest function from the parent component.
    // Send the completed formData object to the parent.
    onAddRequest(formData);

    // Reset the formData state back to its starting values.
    // This clears the form after a successful submission.
    setFormData({
      // Clear the title field.
      title: "",

      // Clear the department field.
      department: "",

      // Clear the request type field.
      requestType: "",

      // Reset priority back to Medium.
      priority: "Medium",

      // Clear the notes field.
      notes: "",

      // Clear the submittedBy field.
      submittedBy: ""
    });
  }

  // Return the JSX that displays the form on the page.
  return (
    // Create a section container for the form area.
    // className connects this section to CSS styling.
    <section className="form-section">
      {/* Display the form section heading. */}
      <h2>Submit a New Support Request</h2>

      {/* Display a short description explaining what this form is for. */}
      <p>
        Add a new classroom tool, tutorial, form, guide, or support workflow
        request.
      </p>

      {/* Create the form element. */}
      {/* className connects the form to CSS styling. */}
      {/* onSubmit tells React to run handleSubmit when the form is submitted. */}
      <form className="request-form" onSubmit={handleSubmit}>
        {/* Create a label for the request title input. */}
        <label>
          {/* Text displayed above or near the input. */}
          Request Title

          {/* Create a text input for the request title. */}
          <input
            // Set this input type to text.
            type="text"

            // Give this input the name "title".
            // This name matches the title property in formData.
            name="title"

            // Set the input's displayed value equal to formData.title.
            // This makes it a controlled input.
            value={formData.title}

            // Run handleChange whenever the user types in this input.
            onChange={handleChange}

            // Show example text when the input is empty.
            placeholder="Example: Need a timer tool"
          />
        </label>

        {/* Create a label for the department input. */}
        <label>
          {/* Text displayed above or near the input. */}
          Department

          {/* Create a text input for department. */}
          <input
            // Set this input type to text.
            type="text"

            // Give this input the name "department".
            // This matches the department property in formData.
            name="department"

            // Set the input's displayed value equal to formData.department.
            value={formData.department}

            // Run handleChange whenever the user types in this input.
            onChange={handleChange}

            // Show example text when the input is empty.
            placeholder="Example: Kindergarten"
          />
        </label>

        {/* Create a label for the request type dropdown. */}
        <label>
          {/* Text displayed above or near the select menu. */}
          Request Type

          {/* Create a dropdown menu for request type. */}
          <select
            // Give this select menu the name "requestType".
            // This matches the requestType property in formData.
            name="requestType"

            // Set the selected value equal to formData.requestType.
            value={formData.requestType}

            // Run handleChange whenever the user selects a different option.
            onChange={handleChange}
          >
            {/* Default blank option shown before the user picks a type. */}
            <option value="">Select a type</option>

            {/* Option for classroom tool requests. */}
            <option value="Classroom Tool">Classroom Tool</option>

            {/* Option for data tracker requests. */}
            <option value="Data Tracker">Data Tracker</option>

            {/* Option for tutorial requests. */}
            <option value="Tutorial">Tutorial</option>

            {/* Option for form requests. */}
            <option value="Form">Form</option>

            {/* Option for help guide requests. */}
            <option value="Help Guide">Help Guide</option>

            {/* Option for requests that do not fit the other categories. */}
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Create a label for the priority dropdown. */}
        <label>
          {/* Text displayed above or near the select menu. */}
          Priority

          {/* Create a dropdown menu for priority. */}
          <select
            // Give this select menu the name "priority".
            // This matches the priority property in formData.
            name="priority"

            // Set the selected value equal to formData.priority.
            value={formData.priority}

            // Run handleChange whenever the user chooses a different priority.
            onChange={handleChange}
          >
            {/* Option for low priority. */}
            <option value="Low">Low</option>

            {/* Option for medium priority. */}
            <option value="Medium">Medium</option>

            {/* Option for high priority. */}
            <option value="High">High</option>
          </select>
        </label>

        {/* Create a label for the submitted by input. */}
        <label>
          {/* Text displayed above or near the input. */}
          Submitted By

          {/* Create a text input for the submitter's name. */}
          <input
            // Set this input type to text.
            type="text"

            // Give this input the name "submittedBy".
            // This matches the submittedBy property in formData.
            name="submittedBy"

            // Set the input's displayed value equal to formData.submittedBy.
            value={formData.submittedBy}

            // Run handleChange whenever the user types in this input.
            onChange={handleChange}

            // Show example text when the input is empty.
            placeholder="Example: Ms. Carter"
          />
        </label>

        {/* Create a label for the notes textarea. */}
        {/* full-width is a CSS class, probably used to make this field stretch across the form. */}
        <label className="full-width">
          {/* Text displayed above or near the textarea. */}
          Notes

          {/* Create a larger text box for notes. */}
          <textarea
            // Give this textarea the name "notes".
            // This matches the notes property in formData.
            name="notes"

            // Set the textarea's displayed value equal to formData.notes.
            value={formData.notes}

            // Run handleChange whenever the user types in this textarea.
            onChange={handleChange}

            // Show example text when the textarea is empty.
            placeholder="Describe the request..."

            // Set the visible height of the textarea to 4 rows.
            rows="4"
          />
        </label>

        {/* Create the submit button for the form. */}
        {/* type="submit" means clicking this button submits the form. */}
        <button type="submit">Add Request</button>
      </form>
    </section>
  );
}

// Export the RequestForm component so other files can import and use it.
export default RequestForm;