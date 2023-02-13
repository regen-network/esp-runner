import {Editor, EditorContent, useEditor} from "@tiptap/react";
import {Node} from "@tiptap/core";
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';
import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-medium.css'
import '@spectrum-css/vars/dist/spectrum-light.css'
import '@spectrum-css/textfield/dist/index-vars.css'
import './styles.css'
import {FieldLabel} from "./FieldLabel";
import {useId} from "react";

const OneLiner = Node.create({
    name: "oneLiner",
    topNode: true,
    content: "block",
});

export interface TextFieldProps {
    label: string,
    fragment: Y.XmlFragment
}

export const TextField = ({fragment, label}: TextFieldProps): JSX.Element => {
    const editor = useEditor({
            extensions: [
                OneLiner,
                Text,
                Paragraph,
                Collaboration.configure({fragment}),
            ],
        }
    )
    const labelId = useId()
    return <div >
        <FieldLabel id={labelId} label={label} />
        <EditorContent editor={editor}/>
    </div>
}

export function getTextFieldText(content: string): string {
    const editor = new Editor({
        extensions: [ OneLiner, Text, Paragraph, ],
        content
    })
    return editor.getText()
}
