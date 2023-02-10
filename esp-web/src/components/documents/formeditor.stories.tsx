import type {Meta} from '@storybook/react';
import {Button, Text, defaultTheme, Provider as SpectrumProvider} from '@adobe/react-spectrum';
import {FormEditor} from "./FormEditor";
import * as Y from "yjs";
import {Stack} from "@mui/material";
import {FormSchema} from "../../model/FormSchema";
import {ChakraProvider} from '@chakra-ui/react'
import {initYMap} from "../../model/initYMap";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/FormEditor',
    component: FormEditor,
} satisfies Meta<typeof FormEditor>;

const TestSchema: FormSchema = {
    pages: [{
        label: "Page 1",
        fields: [
            {
                name: 'text',
                label: "A text field",
                type: {type: 'text'},
            },
            {
                name: 'date',
                label: "A date field",
                type: {type: 'date'},
            },
            {
                name: 'richtext',
                label: "Rich text",
                type: {type: 'richtext'},
            },
            {
                name: 'check',
                label: 'a checkbox',
                type: {type: 'checkbox'}
            },
            {
                name: 'multiselect',
                label: 'Multi-select',
                type: {
                    type: 'multiselect',
                    values: [
                        {
                            label: 'Choice 1',
                            value: '1'
                        },
                        {
                            label: 'Choice 2',
                            value: '2'
                        },
                        {
                            label: 'Choice 3',
                            value: '3'
                        }
                    ]
                }
            }, {
                name: 'select',
                label: 'Select',
                type: {
                    type: 'select',
                    values: [
                        {
                            label: 'Choice 1',
                            value: '1'
                        },
                        {
                            label: 'Choice 2',
                            value: '2'
                        },
                        {
                            label: 'Choice 3',
                            value: '3'
                        }
                    ]
                }
            }, {
                name: 'obj',
                label: 'Object',
                type: {
                    type: 'object',
                    fields: [{
                        name: 'name',
                        label: 'Name',
                        type: {type: 'text'}
                    }, {
                        name: 'birthday',
                        label: 'Birthday',
                        type: {type: 'date'}
                    }]
                }
            },
            {
                name: 'coll1',
                label: "Ordered Collection",
                type:{
                    type:'ordered-collection',
                    fields:[{
                        name: 'name',
                        label: 'Name',
                        type: {type: 'text'}
                    }, {
                        name: 'birthday',
                        label: 'Birthday',
                        type: {type: 'date'}
                    }]
                }
            }
        ]
    }, {
        label: "Page 2",
        fields: [
            {
                name: 'text2',
                label: "Another text field",
                type: {type: 'text'},
            },
            {
                name: 'richtext2',
                label: "Another rich text editor",
                type: {type: 'richtext'},
            },
            {
                name: 'date2',
                label: "Another date field",
                type: {type: 'date'},
            },
        ]
    },
    ]
}

export const Primary = {
    name: 'Primary',
    render: () => {
        const doc = new Y.Doc()
        return <SpectrumProvider theme={defaultTheme}>
            <FormEditor
                schema={TestSchema}
                ymap={doc.getMap()}
            /></SpectrumProvider>
    },
};

export const Collab = {
    name: 'Collab',
    render: () => {
        const doc = new Y.Doc()
        const map = doc.getMap('x')
        initYMap(TestSchema, map)
        return <SpectrumProvider theme={defaultTheme}>
            <Stack>
            <Stack direction="row">
                <FormEditor
                    schema={TestSchema}
                    ymap={map}
                />
                <FormEditor
                    schema={TestSchema}
                    ymap={map}
                />
            </Stack>
                <Button variant="primary"
                        onPress={() => console.log(map.toJSON())}
                ><Text>Dump JSON</Text></Button>
            </Stack>
        </SpectrumProvider>
    },
};
