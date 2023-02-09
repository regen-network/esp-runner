import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';

export interface RichTextFieldProps {
    fragment: Y.XmlFragment
}

export const RichTextField = ({fragment}: RichTextFieldProps): JSX.Element => {
    const editor = useEditor({
            extensions: [
                StarterKit.configure({
                    history: false // Collaboration provides its own history
                }),
                Collaboration.configure({fragment}),
            ],
        }
    )
    return <EditorContent editor={editor}/>
}
