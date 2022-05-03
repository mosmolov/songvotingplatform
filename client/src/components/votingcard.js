import { useEffect, useState, React } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogin } from "react-admin";
function VotingCard(props) {
  let [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  const selectSong = async () => {
    let selectedSongs = [];
    fetch(`${process.env.REACT_APP_API_URL}/songs`)
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then((data) => {
        let counter = 0;
        while (counter < 3) {
          let randSong = data[Math.floor(Math.random() * data.length)];
          if (
            selectedSongs.length === 0 ||
            !selectedSongs.some((item) => item.id === randSong.id)
          ) {
            selectedSongs.push(randSong);
            counter++;
          }
        }
        setSongs(selectedSongs);
      })
      
  };
  function incrementVoteCount(id) {
    songs = songs.map((song) => {
      if (song.id === id) {
        fetch(`https://song-voting-api.herokuapp.com/selectedSongs/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
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
