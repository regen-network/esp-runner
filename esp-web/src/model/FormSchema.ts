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
    required: boolean
}

export interface Many {
    type: 'many'
    ordered: boolean
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

