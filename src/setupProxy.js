// Dev-only: lets `npm start` serve the Vercel function in /api, which CRA's dev server doesn't run on its own.
// CRA already loads .env into process.env before this file is required.
const contactHandler = require("../api/contact");

module.exports = function setupProxy(app) {
  app.post("/api/contact", (req, res) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        req.body = raw ? JSON.parse(raw) : {};
      } catch {
        return res.status(400).json({ error: "Invalid request body." });
      }
      return contactHandler(req, res);
    });
  });
};
