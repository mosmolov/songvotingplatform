import React from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import { SongList } from "./SongList";
import { SongCreate } from "./SongCreate";
import { SongEdit } from "./SongEdit";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import SuggestionIcon from "@material-ui/icons/SpeakerOutlined";
import { SuggestionList } from "./SuggestionList";
import { FirebaseAuthProvider } from "react-admin-firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB2vyjZwRQJEiFxAC6x32Wqm-4FG5ABkf0",
  authDomain: "songvotingplatform.firebaseapp.com",
  projectId: "songvotingplatform",
  storageBucket: "songvotingplatform.appspot.com",
  messagingSenderId: "213547222387",
  appId: "1:213547222387:web:84d9932c365691a07df106",
  measurementId: "G-SR7KBH4K21",
};

FirebaseAuthProvider = FirebaseAuthProvider(firebaseConfig);
function AdminPanel() {
  return (
    <Admin
      authProvider={FirebaseAuthProvider}
      dataProvider={restProvider("http://localhost:3000")}
    >
      <Resource
        icon={MusicNoteIcon}
        name="songs"
        list={SongList}
        edit={SongEdit}
        create={SongCreate}
      />
      <Resource
        icon={SuggestionIcon}
        title="Suggested Songs"
        name="suggestions"
        list={SuggestionList}
      />
    </Admin>
  );
}

export default AdminPanel;
