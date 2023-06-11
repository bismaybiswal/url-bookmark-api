// app.ts
import express, { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bookmarkRoutes from './routes/bookmarkRoutes';
import cors from 'cors';
//import authenticationMiddleware from './middlewares/authenticationMiddleware';
// Dummy data representing a client's ID and secret
const clientID = 'ZYDPLLBWSK3MVQJSIYHB1OR2JXCY0X2C5UJ2QAR2MAAIT5Q';
const clientSecret = '6779ef20e75817b79602';

const app = express();
const PORT = 5000;

app.use(express.json());

// Apply global middleware
//app.use(authenticationMiddleware);
app.use(cors({
  origin: '*'
}))

// Middleware to authenticate requests
function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, 'your_secret_key' as Secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const clientId = (decoded as { client_id: string }).client_id;
    req.headers['client_id'] = clientID;
    console.log(clientID);
    next();
  });
}

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to URL Bookmark");
});

// Endpoint to generate a token
app.post('/token', (req: Request, res: Response) => {
  const { client_id, client_secret } = req.body;

  // Check if the client ID and secret match
  if (client_id === clientID && client_secret === clientSecret) {
    // Generate a JWT token
    const token = jwt.sign({ client_id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid client ID or client secret' });
  }
});

app.use('/bookmark', authenticate, bookmarkRoutes);


// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
