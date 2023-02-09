import type {Meta} from '@storybook/react';
import {RichTextField} from "./RichTextField";
import * as Y from 'yjs';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/Fields/RichTextField',
    component: RichTextField,
    // tags: ['autodocs'],
    argTypes: { },
} satisfies Meta<typeof RichTextField>;

export const Primary = {
    name: 'Primary',
    render: () => {
        const doc = new Y.Doc()
        return <RichTextField fragment={doc.getXmlFragment('x')}/>
    },
};
