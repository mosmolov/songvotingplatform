import { useEffect, useState, React } from "react";
import { Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Recaptcha from "react-google-recaptcha";

import { NotificationManager } from 'react-notifications';
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
            )
            .catch(err => NotificationManager.error(err))
            .then(res => NotificationManager.success("Vote Submitted!"))
          }
          return (
          song
          );
        });
      });
  }
  
  useEffect(() => {
    selectSong();
  }, []);
  return !loading ? (
    <Card.Body className="card-body">
      <ListGroup bg="transparent" text="light" >
        {songs &&
          songs.map(({ id, title, artist }) => {
            return (
              <ListGroup.Item key={id} className="song-list" style={{ "color": "white", background: "transparent", borderBlockColor: "white", borderColor: "white" }}>
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
            );
          })}
      </ListGroup>
      <Recaptcha
        ref={(r) => setCaptchaRef(r)}
        sitekey={process.env.REACT_APP_SITE_KEY}
        render="explicit"
        onChange={verifycallback}
        className="captcha"
      />

      <Button className="admin-button" variant="success">
        <Link style={{ color: "white" }} to="/admin">
          Admin? Login
        </Link>
      </Button>
    </Card.Body>
  ) : (
    <Spinner animation="border" />
  );
}

export default VotingCard;
