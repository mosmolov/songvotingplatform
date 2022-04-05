import React from 'react'
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import { SongList } from "./components/SongList";
import { SongCreate } from "./components/SongCreate";
import { SongEdit } from "./components/SongEdit";
import {
  FirebaseAuthProvider
} from "react-admin-firebase"
import VotingCard from "./components/VotingCard"
const firebaseConfig = {
  apiKey: "AIzaSyB2vyjZwRQJEiFxAC6x32Wqm-4FG5ABkf0",
  authDomain: "songvotingplatform.firebaseapp.com",
  projectId: "songvotingplatform",
  storageBucket: "songvotingplatform.appspot.com",
  messagingSenderId: "213547222387",
  appId: "1:213547222387:web:84d9932c365691a07df106",
  measurementId: "G-SR7KBH4K21"
};

FirebaseAuthProvider = FirebaseAuthProvider(firebaseConfig);
function App(){
  
  return (
  <VotingCard />
    // <Admin authProvider={FirebaseAuthProvider} dataProvider={restProvider("http://localhost:3000")}>
      
    //   <Resource name="songs" list={SongList} edit={SongEdit} create={SongCreate}/>
      
    // </Admin>
  )
}

export default App;