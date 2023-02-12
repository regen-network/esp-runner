import {Field, FormSchema} from "./FormSchema";
import {resolveFields} from "./SchemaContext";
import {getTextFieldText} from "../components/documents/fields/TextField";

export function jsonifyYMapJSON(schema: FormSchema, json: { [key: string]: any }) {
    schema.pages.forEach(page => jsonifyYMapJSONFields(schema, page.fields, json))
}

export function jsonifyYMapJSONFields(schema: FormSchema, fields: Field[], json: { [key: string]: any }) {
    fields.forEach(field => {
        const key = field.name
        const type = field.type
        switch (type.type) {
            case 'text':
                json[key] = getTextFieldText(json[key])
                break
            case 'multiselect':
                json[key] = Object.keys(json[key])
                break
            case 'object':
                jsonifyYMapJSONFields(schema, resolveFields(schema, type.objectDef), json[key])
                break
            case 'keyed-collection': {
                const coll = json[key]
                Object.keys(coll).forEach(id =>
                    jsonifyYMapJSONFields(schema, resolveFields(schema, type.objectDef), coll[id])
                )
                break
            }
            case 'ordered-collection': {
                const coll: Array<any> = json[key]
                coll.forEach(x =>
                    jsonifyYMapJSONFields(schema, resolveFields(schema, type.objectDef), x)
                )
                break
            }
            case 'oneof': {
                const val = json[key]
                const choice = type.choices[val.type]
                jsonifyYMapJSONFields(schema, resolveFields(schema, choice.objectDef), json[key])
                break
            }
        }
    })
}
