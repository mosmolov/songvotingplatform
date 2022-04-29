import { useEffect, useState, React } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function VotingCard(props) {
  let [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  
  function incrementVoteCount(id) {
    songs = songs.map((song) => {
      if (song.id === id) {
        fetch(`http://localhost:3001/selectedSongs/${id}`, {
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
  
  
  return (
    <div>
      Voting!
      <Button variant="success"><Link to="/admin">
        Admin? Login</Link>
      </Button>
    </div>
  );
}

export default VotingCard;
