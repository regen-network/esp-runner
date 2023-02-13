import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';
import {FieldLabel} from "./FieldLabel";
import {useId} from "react";

export interface RichTextFieldProps {
    label: string,
    fragment: Y.XmlFragment
}

export const RichTextField = ({label, fragment}: RichTextFieldProps): JSX.Element => {
    const editor = useEditor({
            extensions: [
                StarterKit.configure({
                    history: false // Collaboration provides its own history
                }),
                Collaboration.configure({fragment}),
            ],
        }
    )
    const id = useId()
    return <div>
        <FieldLabel label={label} id={id}/>
        <EditorContent editor={editor}/>
    </div>
}
