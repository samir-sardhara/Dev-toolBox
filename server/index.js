import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// JSON Formatter
app.post('/format-json', (req, res) => {
  const { json } = req.body;
  try {
    const parsed = JSON.parse(json);
    const pretty = JSON.stringify(parsed, null, 2);
    res.json({ success: true, formatted: pretty });
  } catch (e) {
    res.status(400).json({ success: false, error: 'Invalid JSON' });
  }
});

// Base64 Encode
app.post('/encode', (req, res) => {
  const { text } = req.body;
  try {
    const encoded = Buffer.from(text, 'utf-8').toString('base64');
    res.json({ success: true, result: encoded });
  } catch (e) {
    res.status(400).json({ success: false, error: 'Encoding failed' });
  }
});

// Base64 Decode
app.post('/decode', (req, res) => {
  const { base64 } = req.body;
  try {
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    res.json({ success: true, result: decoded });
  } catch (e) {
    res.status(400).json({ success: false, error: 'Decoding failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 