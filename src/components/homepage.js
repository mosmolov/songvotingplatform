import React from "react";
import VotingCard from "./votingcard";
import { Card } from "react-bootstrap";
import "react-bootstrap";
import "../votingcard.css";
function HomePage(props) {
  return (
    <div className="home-page">
      <Card className="card" bg="transparent" border="light" text="light">
      <Card.Title className="card-title">Vote For Your Favorite Song Below</Card.Title>
        <VotingCard />
      </Card>
    </div>
  );
}

export default HomePage;
