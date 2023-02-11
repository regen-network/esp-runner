import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from 'yjs';
import {View} from "@adobe/react-spectrum";
import {FieldLabel} from "./FieldLabel";

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
    return <div>
        <FieldLabel label={label} />
            <EditorContent editor={editor}/>
    </div>
}
