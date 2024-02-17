const express = require('express');
const router = express.Router();
const validateAuthorId = require('../middleware/validateAuthorId');

// Route to get blogs by author's ID
router.get('/blogs/:authorId', validateAuthorId, async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const blogs = await Blog.find({ authorId });
        res.json({ authorId, blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/insert', async (req, res) => {
    try {
        // Extract data from the request body
        const { title, content, authorId } = req.body;

        // Create a new blog instance
        const newBlog = new Blog({ title, content, authorId });

        // Save the blog to the database
        await newBlog.save();

        // Return success response
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        // Handle errors
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get a single blog by ID
router.get('/:id', async (req, res) => {
    try {
        // Extract the blog ID from the request parameters
        const { id } = req.params;

        // Find the blog by ID in the database
        const blog = await Blog.findById(id);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Return the blog
        res.json(blog);
    } catch (error) {
        // Handle errors
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a blog by ID
router.put('/:id', async (req, res) => {
    try {
        // Extract the blog ID and updated data from the request body
        const { id } = req.params;
        const { title, content } = req.body;

        // Find the blog by ID and update it in the database
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });

        // Check if the blog exists
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Return the updated blog
        res.json(updatedBlog);
    } catch (error) {
        // Handle errors
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a blog by ID
router.delete('/:id', async (req, res) => {
    try {
        // Extract the blog ID from the request parameters
        const { id } = req.params;

        // Find the blog by ID and delete it from the database
        const deletedBlog = await Blog.findByIdAndDelete(id);

        // Check if the blog exists
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Return success response
        res.json({ message: 'Blog deleted successfully', blog: deletedBlog });
    } catch (error) {
        // Handle errors
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
