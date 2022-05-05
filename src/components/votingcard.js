import { useEffect, useState, React } from "react";
import { Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Recaptcha from "react-google-recaptcha";
import "../votingcard.css";
function VotingCard(props) {
  let captcha;
  let [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  let [songs, setSongs] = useState([]);
  const setCaptchaRef = (ref) => {
    if (ref) {
      return (captcha = ref);
    }
  };

  const resetCaptcha = () => {
    captcha.reset();
    setVerified(false);
  };

  function verifycallback(response) {
    if (response) {
      setVerified(true);
    }
  }
  const selectSong = () => {
    fetch(`${process.env.REACT_APP_API_URL}/selectedsongs`)
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setLoading(false);
      });
  };
  function incrementVoteCount(id) {
    let token = "";
    fetch("https://song-voting-api.herokuapp.com/users/login", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      }),
      method: "POST",
    })
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((data) => {
        token = data.token;
        songs = songs.map((song) => {
          if (song.id === id) {
            fetch(
              `https://song-voting-api.herokuapp.com/selectedsongs/${song.id}`,
              {
                method: "PUT",
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  id: id,
                  artist: song.artist,
                  title: song.title,
                  votes: ++song.votes,
                }),
              }
            );
          }
          
          return song;
        });
      });
  }

  useEffect(() => {
    selectSong();
  }, []);

  return (
    <Card.Body>
      {songs &&
        songs.map(({ id, title, artist, votes }) =>
          !loading ? (
            <ListGroup key={id}>
              <ListGroup.Item className="song-list">
                {title} by {artist}
              
                <br />
                <Button
                  className="vote-button"
                  variant="success"
                  disabled={!verified}
                  onClick={() => {
                    incrementVoteCount(id);
                    resetCaptcha();
                  }}
                >
                  Vote
                </Button>
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <Spinner animation="border" />
          )
        )}
      <Recaptcha
        ref={(r) => setCaptchaRef(r)}
        sitekey={process.env.REACT_APP_SITE_KEY}
        render="explicit"
        onChange={verifycallback}
        className="captcha"
      />
      <Button variant="success">
        <Link className="admin-button" to="/admin">
          Admin? Login
        </Link>
      </Button>
    </Card.Body>
  );
}

export default VotingCard;
