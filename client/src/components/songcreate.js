import { SimpleForm, Create, TextInput, NumberInput } from "react-admin";

export const SongCreate = (props) => {
    return (
    <Create title="Add a Song" {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <TextInput source="artist"/>
        </SimpleForm>
    </Create>
    )
}
