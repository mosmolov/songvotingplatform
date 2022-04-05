import { SimpleForm, Create, TextInput, NumberInput } from "react-admin";

export const SongCreate = (props) => {
    return (
    <Create title="Add a Song" {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <TextInput source="artist"/>
            <NumberInput defaultValue={0} disabled={true} source="votes"/>
        </SimpleForm>
    </Create>
    )
}
