import {RichTextField} from "../components/documents/fields/RichTextField";

export interface FormSchema {
    pages: Page[]
    objectTypes: NamedObjectType[]
}

export interface NamedObjectType {
    '@id': string
    fields:Field[]
}

export interface Page {
    label: string
    fields: Field[]
}

export interface OneType {
    required?: boolean
}

export interface ManyType {
    minCount?: number
    maxCount?: number
}

export type Type =
    TextType
    | RichTextType
    | NumberType
    | DateType
    | CheckboxType
    | SelectType
    | MultiSelectType
    | ObjectType
    | OrderedCollectionType
    | KeyedCollectionType
    | OneOfType


export interface ObjectType {
    type: 'object'
    fields: Field[]
}

export interface OneOfType extends OneType {
    type: 'oneof'
    choices: OneOfChoiceType[]
}

export interface OneOfChoiceType {
    name: string
    label: string
    fields?: Field[]
}

export interface Field {
    name: string
    label: string
    type: Type
}

export interface SelectType extends OneType {
    type: 'select'
    values: SelectValue[]
}

export interface SelectValue {
    label: string
    value: string
}

export interface NumberType extends OneType {
    type: 'number'
    min?: number | string
    max?: number | string
    numDecimalPlaces?: number
}

export interface TextType extends OneType {
    type: 'text'
    minLen?: number
    maxLen?: number
}

export interface DateType extends OneType {
    type: 'date'
}

export interface OrderedCollectionType extends ManyType {
    type: 'ordered-collection'
    fields: Field[]
}

export interface ObjectTypeDefinition {
    field:Field[]
}

export interface NamedObjectTypeRef {
    name:String
}

export interface KeyedCollectionType extends ManyType {
    type: 'keyed-collection'
    keyLabel?: string
    fields:Field[]
}

export interface MultiSelectType extends ManyType {
    type: 'multiselect'
    values: SelectValue[]
}

export interface CheckboxType {
    type: 'checkbox'
}

export interface RichTextType {
    type: 'richtext'
}