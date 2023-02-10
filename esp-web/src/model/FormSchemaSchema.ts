import {Field, FormSchema, ObjectType} from "./FormSchema";

const requiredField: Field = {
    name: 'required',
    label: 'Required',
    type: {type: 'checkbox'}
}

export const FieldTypeType: ObjectType = {
    type: 'object',
    fields: [{
        name: 'name',
        label: 'Name',
        type: {type: 'text', required: true},
    }, {
        name: 'label',
        label: 'Label',
        type: {type: 'text', required: true},
    }, {
        name: 'type',
        label: 'Type',
        type: {
            type: 'oneof',
            required: true,
            choices: [{
                name: 'text',
                label: 'Text',
                fields: [requiredField]
            }, {
                name: 'date',
                label: 'Date',
                fields: [requiredField]
            }, {
                name: 'checkbox',
                label: 'Checkbox'
            }]
        }
    }]
}

// export const ObjectTypeFields: Field[] = [{
//     name: "fields",
//     label: "Fields",
// }]
//
// export const FormSchemaSchema: FormSchema = {
//     fields: [{
//         name: 'fields',
//         label: 'Fields',
//         cardinality: {type: 'many', minCount: 1, ordered: true},
//         elementType: FieldTypeType,
//     }]
// };
