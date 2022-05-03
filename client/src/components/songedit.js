import { Edit, SimpleForm, TextInput } from "react-admin";

export const SongEdit = (props) => {
    return(
        <Edit title="Edit Song" {...props}>
        <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source="title"/>
        <TextInput source ="artist"/>
        </SimpleForm>
    </Edit>
    )
    
}