import * as Y from 'yjs'
import {HocuspocusProvider} from '@hocuspocus/provider'
import {useYJSON} from "../../yutil";
import {SchemaEditor} from "./SchemaEditor";
import {Button, Form, Heading, TextField} from "@adobe/react-spectrum";
import {useState} from "react";
import {DocEditor} from "./DocEditor";
import {jsonifyYMapJSON} from "../model/yMapToJson";
import {DocSchemaSchema} from "../model/DocSchemaSchema";

export interface EditorProps {
    docId: string
}

export const Editor = ({docId}: EditorProps): JSX.Element => {
    const provider = new HocuspocusProvider({
        url: 'ws://127.0.0.1:5002',
        name: docId,
        onStatus(e) {
            console.log('status', e)
        }
    });
    const ydoc = provider.document
    const doc = ydoc.getMap('doc')
    // const metadata = ydoc.getMap('metadata')
    // const [docSchema, setDocSchema] = useYMapValue(metadata, 'schema')
    const [docSchema, setDocSchema] = useState<string>()
    console.log('docSchema', docSchema)
    if (!docSchema) {
        return <CreateNewDoc setSchema={setDocSchema}/>
    } else if (docSchema == 'DocSchema') {
        return <SchemaEditor ymap={doc}/>
    } else {
        return <DocEditorWrapper doc={doc} docSchema={docSchema}/>
    }
}

const CreateNewDoc = ({setSchema}: { setSchema: (schema: string) => void }): JSX.Element => {
    const [state, setState] = useState<string>()
    return <Form>
        <TextField label={"Choose a schema"} value={state || ''} onChange={setState}/>
        <Button isDisabled={!state}
                variant="primary"
                onPress={_ => {
                    console.log('onPress', state)
                    if (state) {
                        setSchema(state)
                    }
                }}>Create New</Button>
    </Form>
}

const DocEditorWrapper = ({doc, docSchema}: { doc: Y.Map<any>, docSchema: string }): JSX.Element => {
    if (docSchema) {
        const provider = new HocuspocusProvider({
            url: 'ws://127.0.0.1:5002',
            name: docSchema,
        });
        const schemaYDoc = provider.document
        const schemaDoc = schemaYDoc.getMap('doc')
        if (schemaDoc) {
            const docSchemaJSON = useYJSON(schemaDoc)
            jsonifyYMapJSON(DocSchemaSchema, docSchemaJSON)
            return <DocEditor ymap={doc} schema={docSchemaJSON}/>
        }
    }

    return <Heading level={1}>Loading</Heading>
}