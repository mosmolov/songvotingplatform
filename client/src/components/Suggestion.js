import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";
export const Suggestion = () => {
  const [suggestionName, setSuggestionName] = useState([]);
  const [suggestionArtist, setSuggestionArtist] = useState([]);
  const handleSuggestion = (event) => {
    fetch("http://localhost:3001/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: suggestionName,
        artist: suggestionArtist,
      }),
    });
    setSuggestionName("");
    setSuggestionArtist("");
    event.preventDefault();
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSuggestion}>
            <Form.Group className="mb-3">
              <Form.Label>Suggestions</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Song Name"
                value={suggestionName}
                onChange={(event) => setSuggestionName(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Song Artist"
                value={suggestionArtist}
                onChange={(event) => setSuggestionArtist(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
