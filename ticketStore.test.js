const test = require("node:test");
const assert = require("node:assert/strict");
const { createTicket } = require("./ticketStore");

test("Valid creation", () => {
  const currentState = {
    nextId: 1,
    tickets: new Map(),
  };
  const result = createTicket(currentState, "Printer", "high");
  assert.equal(result, 1);
});
