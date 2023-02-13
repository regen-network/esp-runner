import type {Meta} from '@storybook/react';
import {Editor} from "./Editor";
import {TextField, View} from "@adobe/react-spectrum";
import {useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/Editor',
    component: Editor,
} satisfies Meta<typeof Editor>;


export const Primary = {
    name: 'Primary',
    render: () => {
        const [docId, setDocId] = useState<string>()
        return <View>
            <TextField label="Document ID" value={docId || ''} onChange={setDocId} />
            {docId && <Editor docId={docId} />}
        </View>
    },
};
