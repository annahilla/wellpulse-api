import admin from 'firebase-admin';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });  
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();  
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
};