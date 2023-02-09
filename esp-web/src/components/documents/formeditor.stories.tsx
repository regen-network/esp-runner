import type {Meta} from '@storybook/react';
import {FormEditor} from "./FormEditor";
import * as Y from "yjs";
import {Stack} from "@mui/material";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/FormEditor',
    component: FormEditor,
} satisfies Meta<typeof FormEditor>;

const TestSchema = {
    pages: [{
        label: "Page 1",
        fields: [
            {
                name: 'text',
                label: "A text field",
                type: 'text',
            },
            {
                name: 'date',
                label: "A date field",
                type: 'date',
            },
            {
                name: 'richtext',
                label:"Rich text",
                type: 'richtext',
            },
            {
                name: 'multiline',
                label:"Multi-line not-rich text",
                type: 'multilinetext',
            }
        ]
    }]
}

export const Primary = {
    name: 'Primary',
    render: () => {
        const doc = new Y.Doc()
        return <FormEditor
            schema={TestSchema}
            ymap={doc.getMap()}
        />
    },
};

export const Collab = {
    name: 'Collab',
    render: () => {
        const doc = new Y.Doc()
        const map = doc.getMap('x')
        return <Stack direction="row">
            <FormEditor
                schema={TestSchema}
                ymap={map}
            />
            <FormEditor
                schema={TestSchema}
                ymap={map}
            />
        </Stack>
    },
};
