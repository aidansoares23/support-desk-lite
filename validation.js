// check if ticket title is valid
const hasValidTicketTitle = (str) => {
  if (typeof str !== "string") {
    return false;
  }
  return str.trim().length > 0;
};

module.exports = { hasValidTicketTitle };
