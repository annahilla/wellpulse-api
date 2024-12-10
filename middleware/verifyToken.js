import admin from 'firebase-admin';

export const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });  // Respond with a specific error
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user info to request
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token' });  // Invalid token
    }
};