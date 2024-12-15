const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/serverRoutes');

app.use(express.json());
app.use('/', router);
app.use(cors());
app.listen(4000, () => {
    console.log('Server is running on port 4000')
})