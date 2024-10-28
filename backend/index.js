const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
const cors = require('cors')
const userRoute = require('./routes/userRoute');
const imageRouter = require('./routes/imageRouter');
const kycRouter = require('./routes/kycRouter');
const dbConnect = require('./config/db.connection');
app.use(cors({
    origin: 'http://localhost:3000', // Change this to your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
app.use(express.json())
dbConnect();

app.use('/api/user', userRoute);
app.use('/api/file', imageRouter);
app.use('/api/kyc', kycRouter)


const port = process.env.PORT || 4000 
app.listen(port, ()=>{
    console.log('Lisening to port', port);
})
