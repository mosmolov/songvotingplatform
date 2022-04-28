import React from "react";
import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { SongList } from "./SongList";
import { SongCreate } from "./SongCreate";
import { SongEdit } from "./SongEdit";
// import MusicNoteIcon from "@material-ui/icons/MusicNote";
// import SuggestionIcon from "@material-ui/icons/SpeakerOutlined";
// import { SuggestionList } from "./SuggestionList";
function AdminPanel() {
    return (
      <Admin
        dataProvider={lb4Provider("http://localhost:4000")}
      >
        <Resource
        //   icon={MusicNoteIcon}
          name="songs"
          list={SongList}
        //   edit={SongEdit}
        //   create={SongCreate}
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