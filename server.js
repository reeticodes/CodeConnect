const express = require('express');
const connectDB = require('./config/db');
const methoseoverride = require('method-override')

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended:true}))
app.use(methoseoverride('_method'))

app.get('/', (req,res) => res.send('API running...') )

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/announcements', require('./routes/api/announcements'))

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));