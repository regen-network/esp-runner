import * as Y from 'yjs';
import {useYMapValue} from "../../yutil";
import {TextField} from "./fields/TextField";
import {DateField} from "./fields/DateField";
import {RichTextField} from "./fields/RichTextField";
import {MultiLineTextField} from "./fields/MultiLineTextField";

export interface EditorProps {
    schema: Schema
    ymap: Y.Map<any>
}

export interface Schema {
    pages: Page[]
}

export interface Page {
    label: string
    fields: Field[]
}

export interface Field {
    name: string
    label: string
    type: string
}

export const FormEditor = ({schema, ymap}: EditorProps): JSX.Element => {
    prepMap(schema, ymap)
    return <div children={
        schema.pages.map((page) =>
            <FormPage key={page.label} page={page} ymap={ymap}/>)
    }/>
}

function prepMap(schema: Schema, ymap: Y.Map<any>) {
    schema.pages.forEach(page => {
        page.fields.forEach(field => {
            const key = field.name
            if (!ymap.has(key)) {
                switch (field.type) {
                    case 'text':
                    case 'richtext':
                    case 'multilinetext':
                        ymap.set(field.name, new Y.XmlFragment)
                }
            }
        })
    })
}

const FormPage = ({page, ymap}: { page: Page, ymap: Y.Map<any> }): JSX.Element => {
    return <div>
        <h1>{page.label}</h1>
        <div children={
            page.fields.map((field) =>
                <FormField key={field.name} field={field} ymap={ymap}/>)
        }/>
    </div>
}

const FormField = ({field, ymap}: { field: Field, ymap: Y.Map<any> }): JSX.Element => {
    return <div>
        <h2>{field.label}</h2>
        <FormFieldEditor field={field} ymap={ymap}/>
    </div>
}

const FormFieldEditor = ({field, ymap}: { field: Field, ymap: Y.Map<any> }): JSX.Element => {
    const [value, setValue] = useYMapValue(ymap, field.name)
    switch (field.type) {
        case 'text': {
            return <TextField fragment={value}/>
        }
        case 'richtext': {
            return <RichTextField fragment={value}/>
        }
        case 'multilinetext': {
            return <MultiLineTextField fragment={value}/>
        }
        case 'date': {
            return <DateField onChange={setValue} value={value}/>
        }
        default:
            throw 'unhandled'
    }
}