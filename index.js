// init globals in memory
const state = {
  nextId: 1,
  tickets: new Map(),
};
const fs = require("node:fs");

const { buildTicket } = require("./ticket");

// load previous tickets
function loadTicketsFromFile() {
  if (!fs.existsSync("tickets.json")) {
    return;
  }

  const json = fs.readFileSync("tickets.json", "utf-8");
  const data = JSON.parse(json);

  // 1. Restore the next ticket id
  // this ticket id is the same as var on line 3?
  ticket_id = data.next_id;
  // 2. Restore the saved tickets onto the map
  // use tickets var & for loop?
  for (const [id, ticket] of data.tickets) {
    tickets.set(id, ticket);
  }
}

// save tickets to persistent JSON file
function saveTickets() {
  const data = {
    next_id: ticket_id,
    tickets: [...tickets],
  };

  const json = JSON.stringify(data, null, 2);

  fs.writeFileSync("tickets.json", json);
}

// create ticket
function createTicket(title, priority) {
  const ticket = buildTicket(title, priority);
  if (ticket === null) {
    console.log("can't create ticket");
    return;
  }
  tickets.set(ticket_id, ticket);
  ticket_id += 1;

  saveTickets();
}

// print all tickets to console
function printAllTickets(tickets) {
  if (tickets.size === 0) {
    console.log("There are no tickets.");
    return;
  }

  for (const [id, ticket] of tickets) {
    console.log(
      `${id} | ${ticket.title} | ${ticket.priority} | ${ticket.status}`,
    );
  }
}

// resolve ticket; update status
function resolveTicket(id) {
  if (!tickets.has(id)) {
    console.log(`No ticket exists with the id ${id}`);
    return;
  }

  const ticket = tickets.get(id);
  ticket.status = "resolved";
  saveTickets();
}

// return collection of ticket for reusability
function filterTicketsByStatus(status) {
  const filteredTickets = new Map();
  if (status !== "open" && status !== "resolved") {
    console.log(
      "Ticket has invalid status. Must be set to 'open' or 'resolved'",
    );
    return;
  }
  for (const [id, ticket] of tickets) {
    if (ticket.status === status) {
      filteredTickets.set(id, ticket);
    }
  }
  return filteredTickets;
}

// printAllTickets(tickets);
// createTicket("Printer broken", "high");
// createTicket("WiFi disconnected", "medium");
// createTicket("Monitor flickering", "low");
// printAllTickets(tickets);
// resolveTicket(1);
// console.log("Ticket resolved.");
// printAllTickets(filterTicketsByStatus("open"));
// resolveTicket(2);

loadTicketsFromFile();
printAllTickets(tickets);
