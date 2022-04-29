import React from "react";
import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { SongList } from "./songlist";
import { SongCreate } from "./songcreate";
import { SongEdit } from "./songedit";
// import MusicNoteIcon from "@material-ui/icons/MusicNote";
// import SuggestionIcon from "@material-ui/icons/SpeakerOutlined";
// import { SuggestionList } from "./SuggestionList";
import { authProvider, httpClient } from "../auth";
function AdminPanel() {
    return (
      <Admin
        dataProvider={lb4Provider(process.env.REACT_APP_API_URL, httpClient)}
        authProvider={authProvider}
      >
        <Resource
        //   icon={MusicNoteIcon}
          name="songs"
          list={SongList}
          edit={SongEdit}
          create={SongCreate}
        />
        {/* <Resource
          icon={SuggestionIcon}
          title="Suggested Songs"
          name="suggestions"
          list={SuggestionList}
        /> */}
      </Admin>
    );
  }
  
  export default AdminPanel;