require('dotenv').config(); // Load environment variables from the .env file (optional for Vercel)
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

//Session configuration
app.use(session({
    secret: 'your-secret-key', // Replace with a strong, random secret
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');

