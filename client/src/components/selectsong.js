import { useLogin } from "react-admin";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function Selectsong(){
    let selectedSongs = fetchSongs();
    console.log(selectedSongs);
    const login = useLogin();
    const email = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    login({ email, password }).catch(err => console.log(err));
    
}

function fetchSongs(){
    
    return selectedSongs;
}