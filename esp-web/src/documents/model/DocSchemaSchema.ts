import {Field, DocSchema} from "./DocSchema";

const requiredField: Field = {
    name: 'required',
    label: 'Required',
    type: {type: 'checkbox'}
}

export const FieldTypeFields: Field[] = [{
    name: 'label',
    label: 'Label',
    type: {type: 'text', required: true},
}, {
    name: 'name',
    label: 'Name / IRI',
    type: {type: 'text', required: true},
}, {
    name: 'type',
    label: 'Type',
    type: {
        type: 'oneof',
        required: true,
        choices: {
            'text': {
                label: 'Text',
                objectDef: {
                    type: 'fields-def',
                    fields: [requiredField]
                }
            }, 'date': {
                label: 'Date',
                objectDef: {
                    type: 'fields-def',
                    fields: [requiredField]
                }
            }, 'checkbox': {
                label: 'Checkbox'
            }, 'ordered-collection': {
                label: 'Ordered Collection',
                objectDef: {
                    type: 'fields-def',
                    fields:
                        [{
                            name: 'fields',
                            label: 'Fields',
                            type: {
                                type: 'object',
                                objectDef: {
                                    type: 'object-ref',
                                    ref: 'Field',
                                }
                            }
                        }]
                }
            },
        }
    }
}]

// export const ObjectTypeFields: Field[] = [{
//     name: "fields",
//     label: "Fields",
// }]
//
export const DocSchemaSchema: DocSchema = {
    pages: [{
        label: 'Form',
        fields: [{
            name: 'pages',
            label: 'Pages',
            type: {
                type: 'ordered-collection',
                objectDef: {
                    type: 'fields-def',
                    fields: [{
                        name: 'Label',
                        label: 'Label',
                        type: {type: 'text'}
                    }, {
                        name: 'fields',
                        label: 'Fields',
                        type: {
                            type: 'ordered-collection',
                            objectDef: {
                                type: 'object-ref',
                                ref: 'Field',
                            }
                        }
                    }]
                }
            }
        }]
    }],
    objectTypes: {
        "Field": {
            id: "Field",
            fields: FieldTypeFields
        }
    }
};
