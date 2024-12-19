// @desc   Set Token
// @route   POST /api/auth/set-token
// @access   Private
export const setToken = async (req, res, next) => {
    const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const refreshToken = jwt.sign({ userId }, "your-refresh-token-secret", { expiresIn: '7d' });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Token set successfully" });
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    res.status(400).json({ message: "Invalid token" });
  }
}
