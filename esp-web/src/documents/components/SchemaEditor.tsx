import * as Y from 'yjs';
import {DocEditor} from "./DocEditor";
import {useYJSON} from "../../yutil";
import {DocSchema} from "../model/DocSchema";
import {jsonifyYMapJSON} from "../model/yMapToJson";
import {DocSchemaSchema} from "../model/DocSchemaSchema";
import {Grid, Heading, View} from "@adobe/react-spectrum";

export interface SchemaEditorProps {
    ymap: Y.Map<any>
}

export const SchemaEditor = ({ymap}: SchemaEditorProps): JSX.Element => {
    console.log('loading schema editor', ymap.toJSON())
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
    jsonifyYMapJSON(DocSchemaSchema, schemaJSON)

    return (
        <Grid
            areas={['example schema']}
            height='auto'
            width='auto'
            columns={['50%', '50%']}
        >
            <View padding='size-100'>
                <Heading level={2}>Generated Form</Heading>
                <DocEditor schema={schemaJSON as DocSchema} ymap={tempDoc.getMap()}/>
            </View>
            <View padding='size-100'>
                <Heading level={2}>Schema</Heading>
                <SchemaEditorEditor schema={schema} examples={examples}/>
            </View>
        </Grid>
    );
}


const SchemaEditorEditor = ({schema}: { schema: Y.Map<any>, examples: Y.Map<any> }): JSX.Element => {
    return <DocEditor
        schema={DocSchemaSchema}
        ymap={schema}
    />
}