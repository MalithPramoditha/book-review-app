const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/books', bookRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://malithpramoditha107:cSBjhlTFnuBgcKUS@bookreview.fazbmep.mongodb.net/?retryWrites=true&w=majority&appName=bookreview', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // Export the app for testing purposes
