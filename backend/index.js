require('dotenv').config();
const express        = require('express');
const path           = require('path');
const ParseServer    = require('parse-server').ParseServer;
const Parse          = require('parse/node');
const ParseDashboard = require('parse-dashboard');
const landmarkRouter = require('./routes/landmark');
const userRouter     = require('./routes/user');
const cors           = require('cors');

const databaseUri    = process.env.DATABASE_URI;
const app            = express();
const port           = process.env.SERVER_PORT;
const httpServer     = require('http').createServer(app);
const options        = { allowInsecureHTTP: false };

const parseServerConfig = {
  databaseURI: databaseUri,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
};
const api       = new ParseServer(parseServerConfig);

const dashboard = new ParseDashboard({
    apps: [ {
        "serverURL": process.env.SERVER_URL,
        "appId": process.env.APP_ID,
        "masterKey": process.env.MASTER_KEY,
        "appName": process.env.APP_NAME
    }]
}, options);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use('/parse', api);
app.use('/dashboard', dashboard);
app.use(landmarkRouter, userRouter);

httpServer.listen(port, function () {
  console.log(`Dubai Landmarks Blog is running on port ${port}.`);
});


module.exports = app;
