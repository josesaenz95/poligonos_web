const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = 8001;

app.use(fileUpload({
    useTempFiles: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 5000 }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname + '/src/public')));
app.set('views', path.join(__dirname + '/src/app/views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Starting development server on port ${PORT}`);
});