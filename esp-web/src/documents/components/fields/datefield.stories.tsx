import type {Meta} from '@storybook/react';
import {DateField} from "./DateField";
import * as Y from 'yjs';
import {useYMapValue} from "../../../yutil";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/Fields/DateField',
    component: DateField,
} satisfies Meta<typeof DateField>;

export const Primary = {
    name: 'Primary',
    render: () => {
        const doc = new Y.Doc()
        const [value, setValue] = useYMapValue(doc.getMap('x'), 'date')
        return <DateField label="Date" value={value} onChange={setValue}/>
    },
};
