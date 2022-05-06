import React, { useState, useRef, useEffect } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import VotingCard from "./votingcard";
import { Card } from "react-bootstrap";
import "react-bootstrap";
import "../votingcard.css";
function HomePage(props) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          backgroundColor: 0x0,
          maxDistance: 24.0,
          spacing: 16.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={myRef} className="home-page" id="home-page">
      <Card className="card" bg="transparent" border="light" text="light">
        <Card.Title className="card-title" style={{ fontSize: "50px" }}>
          Vote For Your Favorite Song Below
        </Card.Title>
        <VotingCard />
      </Card>
    </div>
  );
}

export default HomePage;
