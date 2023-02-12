import GridLayout from "react-grid-layout";
import * as Y from 'yjs';
import {FormEditor} from "./FormEditor";
import {useYJSON} from "../../yutil";
import {Stack} from "@mui/material";
import {FormSchema} from "../../model/FormSchema";
import {jsonifyYMapJSON} from "../../model/yMapToJson";
import {FormSchemaSchema} from "../../model/FormSchemaSchema";

export interface SchemaEditorProps {
    ymap: Y.Map<any>
}

export const SchemaEditor = ({ymap}: SchemaEditorProps): JSX.Element => {
    if (!ymap.has('schema')) {
        ymap.set('schema', new Y.Map())
    }
    const schema = ymap.get('schema')

    if (!ymap.has('examples')) {
        ymap.set('examples', new Y.Map())
    }
    const examples = ymap.get('examples')

    const tempDoc = new Y.Doc()
    const schemaJSON = useYJSON(schema)
    jsonifyYMapJSON(FormSchemaSchema, schemaJSON)

    return (
        <Stack direction="row">
            <FormEditor schema={schemaJSON as FormSchema} ymap={tempDoc.getMap()}/>
            {/*{JSON.stringify(schemaJSON)}*/}
            <SchemaEditorEditor schema={schema} examples={examples}/>
        </Stack>
    );
}


const SchemaEditorEditor = ({schema, examples}: { schema: Y.Map<any>, examples: Y.Map<any> }): JSX.Element => {
    return <FormEditor
        schema={FormSchemaSchema}
        ymap={schema}
    />
}