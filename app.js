const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { NOT_FOUND } = require('./utils/statuses');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const auth = require('./middlewares/auth');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* app.use((req, res, next) => {
  req.user = {
    _id: '62e3bc9da3f4b5d874cb7c2b',
  };
  next();
}); */

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use('/*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Cтраницы не существует' });
});
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    // useCreateIndex: true, //https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
    // useFindAndModify: false, //https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
  });
  console.log('Connected to db');
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Ссылка на сервер');
    console.log(BASE_PATH);
  });
}

main();
