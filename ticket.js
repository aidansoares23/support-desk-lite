const { hasValidTicketTitle } = require("./validation");

const priorities = ["low", "medium", "high"];

// failed ticket creation defaults to null
function buildTicket(title, priority) {
  if (!hasValidTicketTitle(title)) {
    return null;
  }

  if (!priorities.includes(priority)) {
    return null;
  }

  const ticket = { title: title, status: "open" };
  return ticket;
}

module.exports = { buildTicket };
