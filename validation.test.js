const test = require("node:test");
const assert = require("node:assert/strict");
const { hasValidTicketTitle } = require("./validation");

test("null", () => {
  const result = hasValidTicketTitle(null);
  assert.equal(result, false);
});

test("Valid string", () => {
  const result = hasValidTicketTitle("Printer broken");
  assert.equal(result, true);
});

test("Empty string", () => {
  const result = hasValidTicketTitle("");
  assert.equal(result, false);
});

test("Whitespace only", () => {
  const result = hasValidTicketTitle("         ");
  assert.equal(result, false);
});

test("Numbers", () => {
  const result = hasValidTicketTitle(123);
  assert.equal(result, false);
});
