const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();
require('./models/connnection');
const blogRoute = require('./routes/blogRoute');

const port = process.env.PORT || 8000
const app = express();

app.use(cors());
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(__dirname + '/images'));

app.use('/api/blog', blogRoute);

app.listen(port, () => {
    console.log(`server running at ${port} port`)
})