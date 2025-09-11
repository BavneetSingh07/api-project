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

app.get('/:username/friends', async (req,res) => {
  const username = req.params.username;
  try{
    const response = await fetch(`${URL}&method=user.getfriends&user=${username}&format=json&limit=20`);
    const data = await response.json();
    console.log(data);
    if (data.friends){
      res.render('friends', {
        totalpages: data.friends['@attr'].totalPages,
        perPage: data.friends['@attr'].perPage,
        friends: data.friends.user,
        attributes: data.friends['@attr']
      })
    } else {
      res.send("no friends found");
    }
  } catch (err) {
    console.error("Internal Error:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/:username/top_albums', async (req,res) => {
  const username = req.params.username;
  try{
    const response = await fetch(`${URL}&method=user.gettopalbums&user=${username}&format=json&limit=5`);
    const data = await response.json();
    console.log(data.topalbums.album);
    if (data.topalbums){
      res.render('top_albums', {
        album: data.topalbums.album
      })
    } else {
      res.send("No Albums Found");
    }
  } catch (err){
    console.error("Internal Error:", err.message);
    res.status(500).send("Internal Server Error")
  }
})

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
      console.error("Internal Error:", err.message);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.send ("Username Cannot Be Blank");
  }
});

app.get('/album/:album/:artist', async (req,res) => {
  const album = req.params.album;
  const artist = req.params.artist;
  try{
    const response = await fetch(`${URL}&method=album.getinfo&album=${album}&artist=${artist}&format=json`);
    const data = await response.json();
    console.log(data.album);
    if (data.album && data.album.tracks && data.album.tracks.track) {
      if (Array.isArray(data.album.tracks.track)){
        res.render('multi-track-album',{
        album: data.album,
        tracklist: data.album.tracks.track
        })
      } else {
        const track = [data.album.tracks.track];
        res.render('single-track-album',{
          album: data.album,
          tracklist: track
          })
      }
    } else if (data.album){
      res.render('single-track-album', {
        album: data.album
      }
    )} else {
      res.send("Album Not Found");
    }
    console.log(data.album);
  } catch (err){
    console.error("Internal Error:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/:username/top_tracks', async (req,res) => {
  const username = req.params.username;
  try{
    const response = await fetch(`${URL}&method=user.gettoptracks&user=${username}&format=json&limit=20`);
    const data = await response.json();
    console.log(data.toptracks.track);
    res.render('top_tracks', {
      tracklist: data.toptracks.track
    })
  } catch (err) {
    console.error("Internal Error: ", err.message);
    res.status(500).send("Internal Server Error");
  }
})

app.get('/:username/top_artists', async (req, res) => {
  const username = req.params.username;
  try{
    const response = await fetch(`${URL}&method=user.gettopartists&user=${username}&format=json&limit=5`);
    const data = await response.json();
    console.log(data.topartists.artist);
    res.render('top_artists', {
      artistList: data.topartists.artist
    })
  } catch (err){
    console.error("Internal error: ", err.message);
    res.status(500).send("Internal Server Error");
  }
})

const PORT = 3000;
app.listen (PORT, () =>{
  console.log(`Server is running on port http://localhost:${PORT}`);
});