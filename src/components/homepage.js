import React from "react";
import VotingCard from "./votingcard";
import { Card } from "react-bootstrap";
import "react-bootstrap";
import "../votingcard.css";
function HomePage(props) {
  return (
    <div className="">
      <Card className="card" border="primary" bg="dark" text="light">
        <Card.Header>Vote For Your Favorite Song Below</Card.Header>
        <VotingCard />
      </Card>
    </div>
  );
}

export default HomePage;
