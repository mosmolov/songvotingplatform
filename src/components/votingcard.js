import { useEffect, useState, React } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Recaptcha from "react-google-recaptcha";
function VotingCard(props) {
  let captcha;
  const setCaptchaRef = (ref) => {
    if (ref) {
      return captcha = ref;
    }
 };

 const resetCaptcha = () => {
   captcha.reset();
   setVerified(false);
 }

  const [verified, setVerified] = useState(false);
  let [songs, setSongs] = useState([]);
  function verifycallback(response) {
    if (response) {
      setVerified(true);
    }
  }
  const selectSong = () => {
    fetch(`${process.env.REACT_APP_API_URL}/selectedsongs`)
      .then((response) => response.json())
      .then((data) => setSongs(data));
  };
  function incrementVoteCount(id) {
    let token = "";
    fetch("https://song-voting-api.herokuapp.com/users/login", {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": process.env.REACT_APP_USERNAME,
        "password": process.env.REACT_APP_PASSWORD,
      }),
      method: "POST",
    })
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((data) => {
        token = data.token;
        songs = songs.map((song) => {
          if (song.id === id) {
            
            fetch(`https://song-voting-api.herokuapp.com/selectedsongs/${song.id}`, {
              method: "PUT",
              headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                id: id,
                artist: song.artist,
                title: song.title,
                votes: ++song.votes
              }),
            });
          }
          window.location.reload(true);
          fetch("https://song-voting-api.herokuapp.com/users/logout")
          return song;
        });
      });
  }


  useEffect(() => {
    selectSong();
  }, []);
  
  return (
    <div>
      {songs &&
        songs.map(({ id, title, artist, votes }) => (
          <Card key={id}>
            <Card.Title>
              {title} by {artist}
            </Card.Title>
            <Card.Body>{votes}</Card.Body>
            <Button variant="success" disabled={!verified} onClick={() => {
              incrementVoteCount(id);
              resetCaptcha();
            }}>
              Vote
            </Button>
          </Card>
        ))}
      <Recaptcha
            ref={(r) => setCaptchaRef(r) }
            sitekey={process.env.REACT_APP_SITE_KEY}
            render="explicit"
            onChange={verifycallback}
          />
      <Button variant="success">
        <Link to="/admin">Admin? Login</Link>
      </Button>
    </div>
  );
}

export default VotingCard;


