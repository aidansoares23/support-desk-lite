// on-success, returns assigned id
// on fail, returns null
const { buildTicket } = require("./ticket");
function createTicket(state, title, priority) {
  const ticket = buildTicket(title, priority);
  if (ticket === null) {
    return null;
  }
  state.tickets.set(state.nextId, ticket);
  const current_id = state.nextId;
  state.nextId += 1;
  return current_id;
}

module.exports = { createTicket };
