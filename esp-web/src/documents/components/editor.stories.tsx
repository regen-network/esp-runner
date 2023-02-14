import type {Meta} from '@storybook/react';
import {Editor} from "./Editor";
import {Button, TextField, View} from "@adobe/react-spectrum";
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
        const [load, setLoad] = useState<boolean>(false)
        return <View>
            <TextField label="Document ID" value={docId || ''} onChange={setDocId} />
            <Button variant={"primary"} onPress={_ => setLoad(true)}>Load</Button>
            {docId && load && <Editor docId={docId} />}
        </View>
    },
};
