const test = require("node:test");
const assert = require("node:assert/strict");
const { buildTicket } = require("./ticket");

test("Valid ticket", () => {
  const result = buildTicket("Printer broken", "high");
  assert.deepEqual(result, {
    title: "Printer broken",
    priority: "high",
    status: "open",
  });
});

test("Correct default status", () => {
  const result = buildTicket("wifi down", "medium");
  assert.equal(result.status, "open");
});

test("Empty title", () => {
  const result = buildTicket("", "low");
  assert.equal(result, null);
});

test("Whitespace only title", () => {
  const result = buildTicket("      ", "medium");
  assert.deepEqual(result, null);
});

test("Invalid priority", () => {
  const result = buildTicket("Printer", "medium-high");
  assert.deepEqual(result, null);
});

test("Non-string title", () => {
  const result = buildTicket(123, "high");
  assert.deepEqual(result, null);
});
