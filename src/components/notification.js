import React, {useState} from "react";
import { Toast, Row, Col, Button } from "react-bootstrap";


export default function Notification(props){
    const [show, setShow] = useState();
    return (
            <Toast show={true} delay={750} autohide>
              <Toast.Header>
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast>
          
      );
}