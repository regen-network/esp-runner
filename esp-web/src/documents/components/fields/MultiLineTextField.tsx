import {EditorContent, useEditor} from "@tiptap/react";
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';

export interface MulitLineTextFieldProps {
    fragment: Y.XmlFragment
}

export const MultiLineTextField = ({fragment}: MulitLineTextFieldProps): JSX.Element => {
    const editor = useEditor({
            extensions: [
                Document,
                Text,
                Paragraph,
                Collaboration.configure({fragment}),
            ],
        }
    )
    return <EditorContent editor={editor}/>
}
