import {EditorContent, useEditor} from "@tiptap/react";
import {Node} from "@tiptap/core";
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';
import {FormControl, InputLabel, Input, FormHelperText} from "@mui/material";

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
    return <div style={{border:'1px black solid'}}>
        <label>{label}</label>
        <EditorContent editor={editor}/>
    </div>
}