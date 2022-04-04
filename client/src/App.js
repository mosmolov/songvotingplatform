import React from 'react'
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import { SongList } from "./components/SongList";
import { SongCreate } from "./components/SongCreate";
import { SongEdit } from "./components/SongEdit";

function App(){
  return (
    <Admin dataProvider={restProvider("http://localhost:3000")}>
      <Resource name="songs" list={SongList} edit={SongEdit} create={SongCreate}/>
    </Admin>
  )
}

export default App;