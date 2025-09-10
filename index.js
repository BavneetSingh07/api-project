let ejs = require('ejs');
let express = require('express')

const app = express();
const API_KEY = "148bb33857a4a78a0fb72df7190aa551";
const URL = `http://ws.audioscrobbler.com/2.0/?api_key=${API_KEY}`;


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard/:username', (req, res) => {
  const username = req.params.username;
  res.send(`hello ${username}`);
});
       
app.post('/username', (req, res) =>{
  const {username} = req.body;
  if (username) {
    res.redirect(`/dashboard/${username}`);
  } else {
    res.send ("send username: can't leave it blank");
  }
});

const PORT = 3000;
app.listen (PORT, () =>{
  console.log(`Server is running on port http://localhost:${PORT}`);
});