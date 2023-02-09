import GridLayout from "react-grid-layout";
import * as Y from 'yjs';
import {FormEditor, Schema} from "./FormEditor";
import {useYMapJSON} from "../../yutil";
import {Stack} from "@mui/material";

export interface SchemaEditorProps {
    ymap: Y.Map<any>
}

export const SchemaEditor = ({ymap}: SchemaEditorProps): JSX.Element => {
    const layout = [
        {i: "a", x: 0, y: 0, w: 1, h: 2, isDraggable: false},
        {i: "b", x: 1, y: 0, w: 1, h: 1, isDraggable: false},
        {i: "c", x: 1, y: 1, w: 1, h: 1, isDraggable: false}
    ];
    if (!ymap.has('schema')) {
        ymap.set('schema', new Y.Map())
    }
    const schema = ymap.get('schema')

    if (!ymap.has('examples')) {
        ymap.set('examples', new Y.Map())
    }
    const examples = ymap.get('examples')

    const tempDoc = new Y.Doc()
    const schemaJSON = useYMapJSON(schema)

    return (
        <Stack direction="row">
            <FormEditor schema={schemaJSON as Schema} ymap={tempDoc.getMap()}/>
            <SchemaEditorEditor schema={schema} examples={examples}/>
        </Stack>
    );
}


const SchemaEditorEditor = ({schema, examples}: { schema: Y.Map<any>, examples: Y.Map<any> }): JSX.Element => {
    return <div></div>
}