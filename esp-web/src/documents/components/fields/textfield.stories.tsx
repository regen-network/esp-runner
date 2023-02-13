import type {Meta} from '@storybook/react';
import {TextField} from "./TextField";
import * as Y from 'yjs';
import {useId} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/Fields/TextField',
    component: TextField,
} satisfies Meta<typeof TextField>;

export const Primary = {
    name: 'Primary',
    render: () => {
        const doc = new Y.Doc()
        return <TextField label="Text Field" fragment={doc.getXmlFragment('x')}/>
    },
};
