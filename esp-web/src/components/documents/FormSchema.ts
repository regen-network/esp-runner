export interface FormSchema {
    fields: Field[]
}

// interface Page {
//     label: string
//     fields: Field[]
// }

export interface Type {
    cardinality: Cardinality
    elementType: ElementType
}

export type Cardinality = One | Many

export interface One {
    type: 'one'
    required?: boolean
}

export interface Many {
    type: 'many'
    minCount?: number
    maxCount?: number
}

export type ElementType = OneOfElementType | OneOfType

export type OneOfElementType =
    ObjectType
    | EnumType
    | NumberType
    | TextType
    | DateType


export interface ObjectType {
    type: 'object'
    fields: Field[]
}

export interface OneOfType {
    type: 'oneof'
    choices: OneOfTypeOption[]
}

export interface OneOfTypeOption {
    name: string
    label: string
    type: OneOfElementType
}

export interface Field extends Type {
    name: string
    label: string
}

export interface EnumType {
    type: 'enum'
    values: EnumValue[]
}

export interface EnumValue {
    label: string
    value: string
}

export interface NumberType {
    type: 'number'
    min?: number | string
    max?: number | string
    numDecimalPlaces?: number
}

export interface TextType {
    type: 'text'
    minLen?: number
    maxLen?: number
}

export interface DateType {
    type: 'date'
}

export const TextTypeType: ObjectType = {
    type: "object",
    fields: [],
}

export const DateTypeType: ObjectType = {
    type: "object",
    fields: [],
}

export const FieldTypeType:ObjectType = {
    type: 'object',
    fields: [{
        name: 'name',
        label: 'Name',
        cardinality: {type: 'one'},
        elementType: {type: 'text'},
    }, {
        name: 'label',
        label: 'Label',
        cardinality: {type: 'one'},
        elementType: {type: 'text'},
    }, {
        name: 'cardinality',
        label: 'Cardinality',
        cardinality: {type: 'one'},
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
        cardinality: {type: "many"},
        elementType: FieldTypeType
    }],
}

export const FormSchemaSchema:FormSchema = {
    fields: [{
        name: 'fields',
        label: 'Fields',
        cardinality: {type: 'many', minCount: 1},
        elementType: FieldTypeType,
    }]
};

