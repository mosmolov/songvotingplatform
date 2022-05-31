import { List, Datagrid, TextField, DeleteButton, CreateButton } from "react-admin";

export const SelectedSongList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="artist" />
      <TextField source="votes" />
      <DeleteButton basepath="/selectedsongs" />
    </Datagrid>
  </List>
);
