const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

// Replace the following with your MongoDB connection string
const dbUri = "mongodb+srv://kritan:Historic1212b@@cluster0.hmfaqnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "MixNMath";

app.use(express.json());

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Connect to the database
    const client = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Check if the username already exists
        const userExists = await collection.findOne({ username });
        if (userExists) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Store the new user
        await collection.insertOne({ username, password: hashedPassword });
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const client = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Find the user by username
        const user = await collection.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Invalid username or password');
        }

        res.send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

