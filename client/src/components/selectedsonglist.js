import { List, Datagrid, TextField, EditButton, DeleteButton } from "react-admin";

export const SelectedSongList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="artist" />
      <TextField source="votes" />
      <EditButton basePath="/selectedsongs" />
      <DeleteButton basePath="/selectedsongs" />
    </Datagrid>
  </List>
);
