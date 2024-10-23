const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';


router.get('/', (req, res) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        jwt.verify(token.split(" ")[1], JWT_SECRET);
        const data = { title: 'React Task', description: 'Description from the backend.' };
        res.json(data);
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
