// middleware/validateAuthorId.js

const validateAuthorId = (req, res, next) => {
    const authorId = req.params.authorId;
    
    // Check if authorId is not a valid integer
    if (!Number.isInteger(parseInt(authorId)) || parseInt(authorId) <= 0) {
      return res.status(400).json({ error: 'Invalid author ID. Author ID must be a positive integer.' });
    }
    
    // Author ID is valid, proceed to the next middleware or route handler
    next();
};

module.exports = validateAuthorId;
