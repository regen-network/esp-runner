import {EditorContent, useEditor} from "@tiptap/react";
import { Node } from "@tiptap/core";
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';

const OneLiner = Node.create({
    name: "oneLiner",
    topNode: true,
    content: "block",
});

export interface TextFieldProps {
    fragment: Y.XmlFragment
}

export const TextField = ({fragment}: TextFieldProps): JSX.Element => {
    const editor = useEditor({
            extensions: [
                OneLiner,
                Text,
                Paragraph,
                Collaboration.configure({fragment}),
            ],
        }
    )
    return <EditorContent editor={editor}/>
}