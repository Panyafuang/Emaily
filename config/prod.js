// ─── prod.js - production keys here!!! ────────────────────────────────────────────────
module.exports = {
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  mongo: {
    uri: process.env.MONGO_URL
  },
  cookie: {
    key: process.env.COOKIE_KEY
  }
}
