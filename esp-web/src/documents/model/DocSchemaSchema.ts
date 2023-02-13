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
}]

const ObjectDefField: Field = {
    name: 'objectDef',
    label: 'Definition',
    type: {
        type: 'oneof',
        choices:
            {
                'fields-def': {
                    label: "Fields Definition",
                    objectDef: {
                        type: 'fields-def',
                        fields: [{
                            name: 'fields',
                            label: "Fields",
                            type: {
                                type: 'ordered-collection',
                                objectDef: {
                                    type: 'object-ref',
                                    ref: 'Field',
                                }
                            }
                        }]
                    }
                },
                'object-ref': {
                    label: "Object Reference",
                    objectDef: {
                        type: 'fields-def',
                        fields: [{
                            name: 'ref',
                            label: "Object",
                            type: {type: 'ref', required: true, refPath: 'objectTypes'}
                        }]
                    }
                }
            }
    }
}

const FieldFields: Field[] = [{
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
            'object':{
                label: 'Object',
                objectDef: {
                    type: 'fields-def',
                    fields: [
                        ObjectDefField,
                    ]
                },
            },
            'ordered-collection': {
                label: 'Ordered Collection',
                objectDef: {
                    type: 'fields-def',
                    fields: [
                        ObjectDefField,
                    ]
                },
            },
            'keyed-collection': {
                label: "Keyed Collection",
                objectDef: {
                    type: 'fields-def',
                    fields: [
                        {
                            label: "Key Label",
                            name: "keyLabel",
                            type: {type: "string", required: false}
                        },
                        ObjectDefField,
                    ]
                }
            },
            'oneof': {
                label: "One-of",
                objectDef: {
                    type: 'fields-def',
                    fields: [{
                        label: 'Choices',
                        name: 'choices',
                        type: {
                            type: 'keyed-collection',
                            objectDef: {
                                type: 'fields-def',
                                fields: [{
                                    label: "Label",
                                    name: 'label',
                                    type: {type: 'text'}
                                }, {
                                    label: "Order",
                                    name: 'order',
                                    type: {type: 'number'}
                                }, ObjectDefField]
                            }
                        }
                    }]
                }
            },
            'ref': {
                label: "Ref",
                objectDef: {
                    type: 'fields-def',
                    fields: [{
                        label: "Ref Path",
                        name: 'refPath',
                        type: {type: 'string'}
                    }]
                }
            }
        }
    }
}, {
    name: 'description',
    label: 'Description',
    type: {type: 'text', required: false}
}, {
    name: 'tooltip',
    label: 'Tooltip',
    type: {type: 'text', required: false}
}]

const FieldsField: Field = {
    name: 'fields',
    label: 'Fields',
    type: {
        type: 'ordered-collection',
        objectDef: {
            type: 'object-ref',
            ref: 'Field',
        }
    }
}

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
                    }, FieldsField]
                }
            }
        }, {
            name: "objectTypes",
            label: "Object Types",
            type: {
                type: 'keyed-collection',
                objectDef: {
                    type: 'fields-def',
                    fields: [FieldsField]
                }
            }
        }]
    }],
    objectTypes: {
        "Field": {
            fields: FieldFields
        }
    }
};
