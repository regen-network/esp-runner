import {EditorContent, useEditor} from "@tiptap/react";
import {Node} from "@tiptap/core";
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';
import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-medium.css'
import '@spectrum-css/vars/dist/spectrum-light.css'
import '@spectrum-css/textfield/dist/index-vars.css'
import styles from './styles.module.css';
import './tiptap.css'

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
    // return <FormControl><EditorContent editor={editor}/></FormControl>
    return <div>
        <label className={styles['field-label']}>{label}</label>
        <EditorContent editor={editor}/>
    </div>
}