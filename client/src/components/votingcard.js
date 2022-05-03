import { useEffect, useState, React } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function VotingCard(props) {
  let [songs, setSongs] = useState([]);

  const selectSong = async () => {

    fetch(`${process.env.REACT_APP_API_URL}/selectedsongs`)
      .then(response => response.json())
      .then(data => setSongs(data));
      
  };
  function incrementVoteCount(id) {
    let token = "";
    fetch("https://song-voting-api.herokuapp.com/users/login", {
        "headers": {
          "accept": "application/json"
        },
        "body": {
            "email": process.env.REACT_APP_USERNAME,
            "password": process.env.REACT_APP_PASSWORD
        },
        "method": "POST"
      })
      .catch(err => console.log(err))
      .then(response => response.json())
      .then(data => token = data.token);
    
    songs = songs.map((song) => {
      if (song.id === id) {
        fetch(`https://song-voting-api.herokuapp.com/selectedSongs/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            id: id,
            artist: song.artist,
            title: song.title,
            votes: song.votes++,
          }),
        });
      }
      return song;
    });
    setSongs(songs);
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
            <Button variant="success" onClick={() => incrementVoteCount(id)}>
              Vote
            </Button>
          </Card>
        ))}

      <Button variant="success">
        <Link to="/admin">Admin? Login</Link>
      </Button>
    </div>
  );
}

export default VotingCard;
