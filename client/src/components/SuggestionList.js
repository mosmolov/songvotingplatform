import { List, Datagrid, TextField, EditButton, DeleteButton } from "react-admin";

export const SuggestionList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="artist" />
      <EditButton basePath="/suggestedSongs" />
      <DeleteButton basePath="/suggestedSongs" />
    </Datagrid>
  </List>
);
