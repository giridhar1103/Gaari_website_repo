require('dotenv').config(); // Load environment variables from the .env file (optional for Vercel)
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

//Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET, // Replace with a strong, random secret
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');

let userTokens = {};
try {
    userTokens = JSON.parse(fs.readFileSync('tokens.json', 'utf-8')) || {};
} catch (err) {}

app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/auth/twitter', (req, res) => {
    const state = crypto.randomBytes(20).toString('hex'); // Generate a random state string
    req.session.state = state; // Store the state in the user's session

    const authorizeUrl = `https://twitter.com/i/oauth2/authorize?
        response_type=code&
        client_id=${process.env.TWITTER_CLIENT_ID}&
        redirect_uri=${process.env.CALLBACK_URL}&
        scope=tweet.read%20users.read&
        state=${state}&
        code_challenge=challenge&code_challenge_method=plain`; 

    res.redirect(authorizeUrl); 
});

app.get('/callback', async (req, res) => {
    const { code, state } = req.query; 
    if (state !== req.session.state) { // Check state for security
        return res.status(400).send('Invalid state'); 
    }

    try {
        const response = await axios.post('https://api.twitter.com/2/oauth2/token', {
            code,
            grant_type: 'authorization_code',
            client_id: process.env.TWITTER_CLIENT_ID,
            redirect_uri: process.env.CALLBACK_URL,
            code_verifier: 'challenge' // Simple example, in reality, use PKCE
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token } = response.data; 
        // TODO: Store access_token associated with the user securely
        userTokens[user_id] = { accessToken, accessTokenSecret }; // Store the user's access token and secret
        fs.writeFileSync('tokens.json', JSON.stringify(userTokens)); // Store the userTokens in a JSON file


        res.send('Authentication successful! You can close this window.');

    } catch (error) {
        console.error("Error getting access token:", error);
        res.status(500).send("Error getting access token");
    }
});

