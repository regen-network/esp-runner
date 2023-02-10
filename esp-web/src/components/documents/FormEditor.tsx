import * as Y from 'yjs';
import {useYMapValue} from "../../yutil";
import {TextField} from "./fields/TextField";
import {DateField} from "./fields/DateField";
import {ElementType, Field, FormSchema} from "../../model/FormSchema";
import {initYMap} from "../../model/initYMap";

export interface EditorProps {
    schema: FormSchema
    ymap: Y.Map<any>
}

export const FormEditor = ({schema, ymap}: EditorProps): JSX.Element => {
    initYMap(schema, ymap)
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

