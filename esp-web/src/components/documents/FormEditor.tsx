import * as Y from 'yjs';
import {useYMapValue} from "../../yutil";
import {TextField} from "./fields/TextField";
import {DateField} from "./fields/DateField";
import {ElementType, Field, FormSchema} from "../../model/FormSchema";

export interface EditorProps {
    schema: FormSchema
    ymap: Y.Map<any>
}

export const FormEditor = ({schema, ymap}: EditorProps): JSX.Element => {
    prepDoc(schema, ymap)
    return <div children={
        schema.fields.map((field) =>
            <FormField key={field.label} field={field} ymap={ymap}/>)
    }/>
}

const FieldsEditor = ({fields, ymap}: {
    fields: Field[]
    ymap: Y.Map<any>
}): JSX.Element => {
    return <div children={
        fields.map((field) =>
            <FormField key={field.label} field={field} ymap={ymap}/>)
    }/>
}

function prepDoc(schema: FormSchema, ymap: Y.Map<any>) {
    schema.fields.forEach(field => {
        const key = field.name
        if (!ymap.has(key)) {
            switch (field.cardinality.type) {
                case 'one':
                    const ty = yType(field.elementType)
                    const val = new ty
                    ymap.set(key, val)
                    break
                case 'many':
                    if (field.cardinality.ordered) {
                        const arr = new Y.Array
                        ymap.set(key, arr)
                    } else {
                        if (yType(field.elementType)) {
                            const arr = new Y.Array
                            ymap.set(key, arr)
                        } else {
                            const map = new Y.Map
                            ymap.set(key, map)
                        }
                    }
                    break
            }

        }
    })
}


// const FormPage = ({page, ymap}: { page: Page, ymap: Y.Map<any> }): JSX.Element => {
//     return <div>
//         <h1>{page.label}</h1>
//         <div children={
//             page.fields.map((field) =>
//                 <FormField key={field.name} field={field} ymap={ymap}/>)
//         }/>
//     </div>
// }

const FormField = ({field, ymap}: { field: Field, ymap: Y.Map<any> }): JSX.Element => {
    return <div>
        <h2>{field.label}</h2>
        <FormFieldEditor field={field} ymap={ymap}/>
    </div>
}

const FormFieldEditor = ({field, ymap}: { field: Field, ymap: Y.Map<any> }): JSX.Element => {
    const [value, setValue] = useYMapValue(ymap, field.name)
    const {cardinality, elementType} = field
    switch (cardinality.type) {
        case 'one':
            return <ElementEditor elementType={elementType} value={value} setValue={setValue}/>
        case 'many':
            if (cardinality.ordered) {
                switch (elementType.type) {
                    case 'text':
                        throw 'TODO'
                    case 'date':
                        throw 'TODO'
                    case 'object':
                        throw 'TODO'
                    case "enum":
                        throw 'TODO: check box group'
                    case "number":
                        throw 'TODO'
                    case "oneof":
                        throw 'TODO'
                }
            } else {
                switch (elementType.type) {
                    case 'text':
                        throw 'TODO'
                    case 'date':
                        throw 'TODO'
                    case 'object':
                        throw 'TODO'
                    case "enum":
                        throw 'TODO: check box group'
                    case "number":
                        throw 'TODO'
                    case "oneof":
                        throw 'TODO'
                }
            }
            break
    }
    return <div></div>
    // switch (field.type) {
    //     case 'text': {
    //         return <TextField fragment={value}/>
    //     }
    //     case 'richtext': {
    //         return <RichTextField fragment={value}/>
    //     }
    //     case 'multilinetext': {
    //         return <MultiLineTextField fragment={value}/>
    //     }
    //     case 'date': {
    //         return <DateField onChange={setValue} value={value}/>
    //     }
    //     default:
    //         throw 'unhandled'
    // }
}

const ElementEditor = ({
                           elementType,
                           value,
                           setValue
                       }: { elementType: ElementType, value: any, setValue: any }): JSX.Element => {
    switch (elementType.type) {
        case 'text':
            return <TextField fragment={value}/>
        case 'date':
            return <DateField onChange={setValue} value={value}/>
        case 'object':
            return <FieldsEditor fields={elementType.fields} ymap={value}/>
        case "enum":
            throw 'TODO'
        case "number":
            throw 'TODO'
        case "oneof":
            throw 'TODO'
    }
}

const yType = (elementType: ElementType): any => {
    switch (elementType.type) {
        case 'text':
            return Y.Text
        case 'object':
            return Y.Map
        default:
            return null
    }
}

export function setInitJson(schema: FormSchema, ymap: Y.Map<any>, initContent: any) {
    setFields(schema.fields, ymap, initContent)
}

function setFields(fields: Field[], ymap: Y.Map<any>, initContent: any) {
    fields.forEach(field => {
        const key = field.name
        const val = initContent[key]
        switch (field.cardinality.type) {
            case "one":
                const yval = toYType(field.elementType, val)
                ymap.set(key, yval)
                break
            case "many":
                if (field.cardinality.ordered) {
                    const arr = new Y.Array()
                    val.forEach((x: any) => {
                        arr.push(toYType(field.elementType, x))
                    })
                    ymap.set(key, arr)
                } else {
                    switch (field.elementType.type) {
                        case 'text':
                        case 'object':
                        case "oneof":
                            const arr = new Y.Array()
                            val.forEach((x: any) => {
                                arr.push(toYType(field.elementType, x))
                            })
                            ymap.set(key, arr)
                            break;
                        case 'date':
                        case "enum":
                        case "number":
                            const map = new Y.Map()
                            val.forEach((x: any) => {
                                map.set(x.toString(), true)
                            })
                            ymap.set(key, map)
                    }
                }
        }
    })
}

const toYType = (elementType: ElementType, value: any): any => {
    switch (elementType.type) {
        case 'text':
            return new Y.Text(value)
        case 'object': {
            const map = new Y.Map()
            setFields(elementType.fields, map, value)
            return map
        }
        case 'oneof': {
            const map = new Y.Map()
            const type = value.type
            map.set('type', type)
            elementType.choices.forEach(
                (choice) => {
                    if (choice.name == type) {
                        switch (choice.type.type) {
                            case "object":
                                setFields(choice.type.fields, map, value)
                                break
                            default:
                                map.set('value', value)
                        }
                    }
                }
            )
            return map
        }
        default:
            return value
    }
}
