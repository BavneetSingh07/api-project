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

app.get('/dashboard/:username', async (req, res) => {
  const username = req.params.username;
  console.log("Route hit for:", username, new Date().toISOString());
  try {
    const response = await fetch(`${URL}&method=user.getInfo&user=${username}&format=json`);
    const data = await response.json();
    console.log(data);
    if (data.user) {
      res.render('dashboard', { user: data.user });
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    console.error("Internal Error:", err.message);
    res.status(500).send("Internal Server Error");
  }
});
       
app.post('/username', async (req, res) =>{
  const {username} = req.body;
  if (username) {
    try{
      const response = await fetch (`${URL}&method=user.getInfo&user=${username}&format=json`);
      const data = await response.json();
      if (data.user){
        res.redirect(`/dashboard/${username}`);
      } else {
        res.send("User Not Found");
      }
    } catch (err){
      console.error("Internal Error");
    }
  } else {
    res.send ("Username Cannot Be Blank");
  }
});

const PORT = 3000;
app.listen (PORT, () =>{
  console.log(`Server is running on port http://localhost:${PORT}`);
});