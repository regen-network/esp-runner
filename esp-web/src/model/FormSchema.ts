export interface FormSchema {
    pages: Page[]
    objectTypes?: { [id: string]: NamedObjectType }
}

export interface NamedObjectType {
    id: string
    fields: Field[]
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
    StringType
    | TextType
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
    | RefType


export interface ObjectType {
    type: 'object'
    objectDef: ObjectDef
}

export interface OneOfType extends OneType {
    type: 'oneof'
    choices: { [name: string]: OneOfChoiceType }
}

export interface OneOfChoiceType {
    label: string
    objectDef?: ObjectDef
    order?: number
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
    objectDef: ObjectDef
}

export interface KeyedCollectionType extends ManyType {
    type: 'keyed-collection'
    keyLabel?: string
    objectDef: ObjectDef
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

export interface StringType {
    type: 'string'
}

export interface RefType {
    type: 'ref'
    refType: string
}

export type ObjectDef = FieldsDefinition | ObjectRef

export interface FieldsDefinition {
    type: 'fields-def'
    fields: Field[]
}

export interface ObjectRef {
    type: 'object-ref'
    ref: string
}
