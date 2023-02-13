import * as Y from 'yjs';
import {FieldLabel} from "./FieldLabel";
import {useId} from "react";
import {MonacoBinding} from 'y-monaco'
import Editor from "@monaco-editor/react";
import './styles.css'

export interface CodeFieldProps {
    label: string,
    language: string,
    text: Y.Text
    height?: number | string
}

export const CodeField = ({label, text, language, height}: CodeFieldProps): JSX.Element => {
    const id = useId()
    return <div className="CodeField">
        <FieldLabel label={label} id={id}/>
        <Editor
            language={language}
            height={height || "15vh"}
            onMount={editor => {
                if (editor) {
                    const model = editor.getModel()
                    if (model) {
                        new MonacoBinding(text, model)
                    }
                }
            }}
        />
    </div>
}
