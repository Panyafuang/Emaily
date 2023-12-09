module.exports = {
  google: {
    client_id: "1027725680582-rtvsktsklvete2a5827l5llj0sp7fpgc.apps.googleusercontent.com",
    project_id: "emaily-407413",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "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",
    redirect_uris: [
      "http://localhost:5000/auth/google/callback"
    ],
    javascript_origins: [
      "http://localhost:5000"
    ]
  },
  mongo: {
    uri: 'mongodb+srv://Thanadilok:qjrMyxhv00qq4vXd@emaily.zh5t9rg.mongodb.net/?retryWrites=true&w=majority'
  },
  cookie: {
    key: 'asdfjadkfjasldkfasdfasdfasdfasdfasdf'
  }
}