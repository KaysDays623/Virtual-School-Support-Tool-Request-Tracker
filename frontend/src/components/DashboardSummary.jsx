// This creates a reusable DashboardSummary component for the IT dashboard.
function DashboardSummary({ requests }) {
  // This stores the total number of requests.
  const totalRequests = requests.length;

  // This counts how many requests have the status "New".
  const newRequests = requests.filter((request) => request.status === "New").length;

  // This counts how many requests have the status "In Progress".
  const inProgressRequests = requests.filter(
    (request) => request.status === "In Progress"
  ).length;

  // This counts how many requests have the status "Completed".
  const completedRequests = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  // This counts how many requests have the priority "High".
  const highPriorityRequests = requests.filter(
    (request) => request.priority === "High"
  ).length;

  // This creates an array of summary card data so we can display the cards with map.
  const summaryItems = [
    // This object represents the total requests summary card.
    {
      // This is the label shown on the card.
      label: "Total Requests",

      // This is the number shown on the card.
      value: totalRequests
    },

    // This object represents the new requests summary card.
    {
      // This is the label shown on the card.
      label: "New",

      // This is the number shown on the card.
      value: newRequests
    },

    // This object represents the in-progress requests summary card.
    {
      // This is the label shown on the card.
      label: "In Progress",

      // This is the number shown on the card.
      value: inProgressRequests
    },

    // This object represents the completed requests summary card.
    {
      // This is the label shown on the card.
      label: "Completed",

      // This is the number shown on the card.
      value: completedRequests
    },

    // This object represents the high-priority requests summary card.
    {
      // This is the label shown on the card.
      label: "High Priority",

      // This is the number shown on the card.
      value: highPriorityRequests
    }
  ];

  // This returns the JSX that displays the summary cards.
  return (
    // This section wraps the whole dashboard summary area.
    <section className="summary-section">
      {/* This maps through each summary item and creates one card for each item. */}
      {summaryItems.map((item) => (
        // This article is one summary card.
        <article key={item.label} className="summary-card">
          {/* This paragraph displays the summary card label. */}
          <p>{item.label}</p>

          {/* This heading displays the summary card number. */}
          <h3>{item.value}</h3>
        </article>
      ))}
    </section>
  );
}

// This exports the DashboardSummary component so App.jsx can use it.
export default DashboardSummary;