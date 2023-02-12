import type {Meta} from '@storybook/react';
import {Button, Text, defaultTheme, Provider as SpectrumProvider} from '@adobe/react-spectrum';
import {FormEditor} from "./FormEditor";
import * as Y from "yjs";
import {Stack} from "@mui/material";
import {Field, FormSchema} from "../../model/FormSchema";
import {initYMap} from "../../model/initYMap";
import {FormSchemaSchema} from "../../model/FormSchemaSchema";
import {jsonifyYMapJSON} from "../../model/yMapToJson";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
    title: 'Documents/FormEditor',
    component: FormEditor,
} satisfies Meta<typeof FormEditor>;

const requiredField: Field = {
    name: 'required',
    label: 'Required',
    type: {type: 'checkbox'}
}

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
                name: 'str1',
                label: "Dumb string",
                type: {type: 'string'},
            },
            {
                name: 'num1',
                label: "A number",
                type: {type: 'number'},
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
                    objectDef: {
                        type: 'fields-def',
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
                }
            },
            {
                name: 'oneof1',
                label: "A One-of",
                type: {
                    type: 'oneof',
                    choices: {
                        'text':
                            {
                                label: 'Text',
                                order: 1,
                                objectDef: {
                                    type: 'fields-def',
                                    fields: [
                                        requiredField,
                                        {
                                            name: 'format',
                                            label: 'Format',
                                            type: {type: 'string'}
                                        }
                                    ]
                                }
                            }, 'date': {
                            label: 'Date',
                            order: 2,
                            objectDef: {
                                type: 'fields-def',
                                fields: [requiredField]
                            }
                        }, 'checkbox': {
                            label: 'Checkbox'
                        },
                        'richtext': {
                            label: 'Rich Text'
                        }
                    }
                },
            },
            {
                name: 'coll1',
                label: "Ordered Collection",
                type: {
                    type: 'ordered-collection',
                    objectDef: {
                        type: 'fields-def',
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
                }
            },
            {
                name: 'coll2',
                label: "Keyed Collection",
                type: {
                    type: 'keyed-collection',
                    objectDef: {
                        type: 'fields-def',
                        fields: [{
                            name: 'desc',
                            label: 'Description',
                            type: {type: 'text'}
                        }, {
                            name: 'start-date',
                            label: 'Start Date',
                            type: {type: 'date'}
                        }]
                    }
                }
            },
            {
                name: 'aref',
                label: "A reference to the collection above",
                type:{
                    type:'ref',
                    refPath:'coll2'
                }
            }
        ]
    },
        {
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
        }
        ,
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
                        onPress={() => {
                            const json = map.toJSON()
                            const json2 = map.toJSON()
                            jsonifyYMapJSON(TestSchema, json2)
                            console.log(json, json2)
                        }}
                ><Text>Dump JSON</Text></Button>
            </Stack>
        </SpectrumProvider>
    },
};

export const Form = {
    name: 'Form',
    render: () => {
        const doc = new Y.Doc()
        return <SpectrumProvider theme={defaultTheme}>
            <FormEditor
                schema={FormSchemaSchema}
                ymap={doc.getMap()}
            /></SpectrumProvider>
    },
};
