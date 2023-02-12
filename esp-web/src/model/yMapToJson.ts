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
        const value = json[key]
        if (value !== undefined) {
            switch (type.type) {
                case 'text':
                    json[key] = getTextFieldText(value)
                    break
                case 'multiselect':
                    json[key] = Object.keys(value)
                    break
                case 'object':
                    jsonifyYMapJSONFields(schema, resolveFields(schema, type.objectDef), value)
                    break
                case 'keyed-collection': {
                    Object.keys(value).forEach(id =>
                        jsonifyYMapJSONFields(schema, resolveFields(schema, type.objectDef), value[id])
                    )
                    break
                }
                case 'ordered-collection': {
                    value.forEach((x: any) =>
                        jsonifyYMapJSONFields(schema, resolveFields(schema, type.objectDef), x)
                    )
                    break
                }
                case 'oneof': {
                    if (value.type) {
                        const choice = type.choices[value.type]
                        jsonifyYMapJSONFields(schema, resolveFields(schema, choice.objectDef), value)
                    }
                    break
                }
            }
        }
    })
}
