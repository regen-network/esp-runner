import type {Meta} from '@storybook/react';
import {MultiLineTextField} from "./MultiLineTextField";
import * as Y from 'yjs';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/Fields/MultiLineTextField',
    component: MultiLineTextField,
} satisfies Meta<typeof MultiLineTextField>;

export const Primary = {
    name: 'Primary',
    render: () => {
        const doc = new Y.Doc()
        return <MultiLineTextField fragment={doc.getXmlFragment('x')}/>
    },
};
