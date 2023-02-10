import {FormSchema, ObjectType} from "./FormSchema";

export const TextTypeType: ObjectType = {
    type: "object",
    fields: [],
}

export const DateTypeType: ObjectType = {
    type: "object",
    fields: [],
}

export const FieldTypeType: ObjectType = {
    type: 'object',
    fields: [{
        name: 'name',
        label: 'Name',
        cardinality: {type: 'one', required:true},
        elementType: {type: 'text'},
    }, {
        name: 'label',
        label: 'Label',
        cardinality: {type: 'one', required: true},
        elementType: {type: 'text'},
    }, {
        name: 'cardinality',
        label: 'Cardinality',
        cardinality: {type: 'one', required: true},
        elementType: {
            type: 'oneof',
            choices: [{
                name: 'text',
                label: 'Text',
                type: TextTypeType,
            }, {
                name: 'date',
                label: 'Date',
                type: DateTypeType,
            }]
        }
    }]
}

export const ObjectTypeType: ObjectType = {
    type: "object",
    fields: [{
        name: "fields",
        label: "Fields",
        cardinality: {type: "many", ordered: true},
        elementType: FieldTypeType
    }],
}

export const FormSchemaSchema: FormSchema = {
    fields: [{
        name: 'fields',
        label: 'Fields',
        cardinality: {type: 'many', minCount: 1, ordered: true},
        elementType: FieldTypeType,
    }]
};
