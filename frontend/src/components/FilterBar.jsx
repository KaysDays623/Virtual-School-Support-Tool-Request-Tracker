// This creates a reusable FilterBar component for the IT dashboard.
function FilterBar({
  // This prop stores what the user typed into the search box.
  searchTerm,

  // This prop updates the search text in App.jsx.
  setSearchTerm,

  // This prop stores the currently selected status filter.
  statusFilter,

  // This prop updates the selected status filter in App.jsx.
  setStatusFilter,

  // This prop stores the currently selected priority filter.
  priorityFilter,

  // This prop updates the selected priority filter in App.jsx.
  setPriorityFilter,

  // This prop stores the currently selected department filter.
  departmentFilter,

  // This prop updates the selected department filter in App.jsx.
  setDepartmentFilter,

  // This prop contains the list of departments from the request data.
  departments
}) {
  // This return statement sends the filter section UI back to App.jsx.
  return (
    // This section wraps the whole search and filter area.
    <section className="filter-section">
      {/* This label wraps the search input and gives it a title. */}
      <label className="search-label">
        {/* This text appears above the search box. */}
        Search Requests

        {/* This input lets IT staff type a search term. */}
        <input
          // This makes the input a text box.
          type="text"

          // This connects the input value to the searchTerm state in App.jsx.
          value={searchTerm}

          // This updates searchTerm every time the user types.
          onChange={(event) => setSearchTerm(event.target.value)}

          // This gives the user a hint about what they can search for.
          placeholder="Search by title, department, type, notes, or submitter..."
        />
      </label>

      {/* This div groups the dropdown filters together. */}
      <div className="filter-controls">
        {/* This label wraps the status dropdown. */}
        <label>
          {/* This text appears above the status dropdown. */}
          Status

          {/* This dropdown lets the user filter requests by status. */}
          <select
            // This connects the dropdown value to statusFilter in App.jsx.
            value={statusFilter}

            // This updates statusFilter when the user chooses a new option.
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            {/* This option shows all statuses. */}
            <option value="All">All</option>

            {/* This option shows only new requests. */}
            <option value="New">New</option>

            {/* This option shows only requests that are in progress. */}
            <option value="In Progress">In Progress</option>

            {/* This option shows only completed requests. */}
            <option value="Completed">Completed</option>

            {/* This option shows only requests that are on hold. */}
            <option value="On Hold">On Hold</option>
          </select>
        </label>

        {/* This label wraps the priority dropdown. */}
        <label>
          {/* This text appears above the priority dropdown. */}
          Priority

          {/* This dropdown lets the user filter requests by priority. */}
          <select
            // This connects the dropdown value to priorityFilter in App.jsx.
            value={priorityFilter}

            // This updates priorityFilter when the user chooses a new option.
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            {/* This option shows all priorities. */}
            <option value="All">All</option>

            {/* This option shows only high priority requests. */}
            <option value="High">High</option>

            {/* This option shows only medium priority requests. */}
            <option value="Medium">Medium</option>

            {/* This option shows only low priority requests. */}
            <option value="Low">Low</option>
          </select>
        </label>

        {/* This label wraps the department dropdown. */}
        <label>
          {/* This text appears above the department dropdown. */}
          Department

          {/* This dropdown lets the user filter requests by department. */}
          <select
            // This connects the dropdown value to departmentFilter in App.jsx.
            value={departmentFilter}

            // This updates departmentFilter when the user chooses a new option.
            onChange={(event) => setDepartmentFilter(event.target.value)}
          >
            {/* This maps through the department list and creates one option per department. */}
            {departments.map((department) => (
              // This option represents one department choice in the dropdown.
              <option key={department} value={department}>
                {/* This displays the department name to the user. */}
                {department}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

// This exports the FilterBar component so App.jsx can import and use it.
export default FilterBar;