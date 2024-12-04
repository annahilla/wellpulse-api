export  const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization;
    if (!idToken) {
      return res.status(403).send('Token not provided');
    }
  
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send('Invalid or expired token');
    }
  };