import type {Meta} from '@storybook/react';
import {SchemaEditor} from "./SchemaEditor";
import * as Y from "yjs";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/SchemaEditor',
    component: SchemaEditor,
} satisfies Meta<typeof SchemaEditor>;


export const Primary = {
    name: 'Primary',
    render: () => {
        const doc = new Y.Doc()
        return <SchemaEditor ymap={doc.getMap()}/>
    },
};
