// test.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/test-register', (req, res) => {
  console.log('✅ Reached route:', req.body);
  res.status(200).json({ message: 'It works!' });
});

app.listen(5050, () => console.log('Server running on port 5050'));
