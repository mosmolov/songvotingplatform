import { List, Datagrid, TextField, EditButton, DeleteButton } from "react-admin";

export const SongList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="artist" />
      <EditButton basepath="/songs" />
      <DeleteButton basepath="/songs" />
    </Datagrid>
  </List>
);
