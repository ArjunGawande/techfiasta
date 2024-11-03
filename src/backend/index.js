const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors');
const app = express();
const port = 5000;
const jwt = require('jsonwebtoken');
app.use(cors());
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const bcrypt = require('bcrypt');
const { error } = require('console');
const saltRounds = 10;
const SECRET_KEY = 'your_jwt_secret_key';  
// now we have to set the db 

const pool = new Pool({
    user: 'postgres',       
    host: 'localhost',
    database: 'SIH_BE',     
    password: 'pgadmin',
    port: 5432,             
  });


  app.post('/login', async (req, res) => {
    const { username, password: loginpassword } = req.body;

    try {
        // Query to find the user by username
        const userQuery = 'SELECT * FROM tech WHERE username = $1';
        const userResult = await pool.query(userQuery, [username]);

        // Check if user exists
        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            const storedHashedPassword = user.password;

            // Check if the password matches
            const passwordMatch = await bcrypt.compare(loginpassword, storedHashedPassword);

            if (passwordMatch) {
                // Generate token if password matches
                const token = jwt.sign(
                    { username: user.username, id: user.id },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ message: 'User authenticated successfully', token });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error during authentication", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
        console.log("Missing username, email, or password");
        return res.status(400).json({ message: "Please send username, email, and password" });
    }

    try {
        // Hash the password before storing it
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log("Error hashing password:", err);
                return res.status(500).send('Error creating user');
            }

            const query = 'INSERT INTO tech (username, email, password) VALUES ($1, $2, $3)';
            await pool.query(query, [username, email, hash]);
            res.status(201).send('User created');
        });
    } catch (err) {
        console.log("Error creating user:", err);
        res.status(500).send('Error creating user');
    }
});


const authenticateToken = (req,res,next)=> {
    const authHeader = req.authHeader && authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token , SECRET_KEY,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.email}, to the protected route.` });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });