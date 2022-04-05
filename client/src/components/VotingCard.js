import { useEffect, useState, React } from "react";
import { Card, Button } from "react-bootstrap";

function VotingCard(props) {
  let [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/songs")
    .then(response => response.json())
    .then((data) => {
        setSongs(data);
    })
    .catch((err) => {
        setError(err.message);
        setSongs(null);
      })
      
  }, []);
function incrementVoteCount(id)
{
    songs = songs.map((song) => {
        if(song.id === id){
            fetch(`http://localhost:3001/songs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  },
                body: JSON.stringify({
                    "id": id,
                    "artist": song.artist,
                    "title": song.title, 
                    "votes": song.votes++
                })
            })
            
        }
        return song;
    })
    setSongs(songs);
}
  return (
    <div>
        <ul>
        {songs &&
          songs.map(({ id, title, artist, votes }) => (
            <Card key={id}>
                <Card.Title>{title} by {artist}</Card.Title>
                <Card.Body>{votes}</Card.Body>
                <Button variant="success" onClick={() => incrementVoteCount(id)}>Vote</Button>
            </Card>
          ))}
      </ul>
    </div>
  );
}

export default VotingCard;
