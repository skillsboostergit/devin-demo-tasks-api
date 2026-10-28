const config = require("../config");

// Rejects requests that do not send the correct key in the x-api-key header.
function apiKeyAuth(req, res, next) {
  const key = req.get("x-api-key");
  if (!key) {
    return res.status(401).json({ error: "Missing API key" });
  }
  if (key !== config.apiKey) {
    return res.status(403).json({ error: "Invalid API key" });
  }
  req.apiKey = key;
  next();
}

module.exports = { apiKeyAuth };
