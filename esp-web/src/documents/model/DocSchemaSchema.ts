import {Field, DocSchema} from "./DocSchema";

const requiredField: Field = {
    name: 'required',
    label: 'Required',
    type: {type: 'checkbox'}
}

const SelectValueFields: Field[] = [{
    name: 'label',
    label: 'Label',
    type: {type: 'text', required: true}
}, {
    name: 'value',
    label: 'Value / IRI',
    type: {type: 'string', required: true}
}, {
    name: 'description',
    label: 'Description',
    type: {type: 'text', required: false}
}
]

const FieldTypeFields: Field[] = [{
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
                order: 1,
                objectDef: {
                    type: 'fields-def',
                    fields: [requiredField]
                }
            }, 'richtext': {
                label: 'Rich Text',
                objectDef: {
                    type: 'fields-def',
                    fields: [requiredField]
                }
            }, 'string': {
                label: "String",
            },
            'number': {
                label: 'Number',
                objectDef: {
                    type: 'fields-def',
                    fields: [requiredField]
                }
            },
            'date': {
                label: 'Date',
                objectDef: {
                    type: 'fields-def',
                    fields: [requiredField]
                }
            },
            'checkbox': {
                label: 'Checkbox'
            },
            'select': {
                label: 'Select',
                objectDef: {
                    type: 'fields-def',
                    fields: SelectValueFields
                }
            },
            'multiselect': {
                label: 'Multi-Select',
                objectDef: {
                    type: 'fields-def',
                    fields: SelectValueFields
                }
            },
            'ordered-collection': {
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
},{
    name:'description',
    label:'Description',
    type: {type: 'text', required: false}
},{
    name:'tooltip',
    label:'Tooltip',
    type: {type: 'text', required: false}
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
