import {Field, FormSchema} from "./FormSchema";
import * as Y from "yjs";

export function initYMap(schema: FormSchema, ymap: Y.Map<any>) {
    schema.pages.forEach(page => initYMapFields(page.fields, ymap))
}

export function initYMapFields(fields: Field[], ymap: Y.Map<any>) {
    fields.forEach(field => {
        const key = field.name
        if (!ymap.has(key)) {
            const type = field.type
            switch (type.type) {
                case 'text':
                case 'richtext':
                    ymap.set(key, new Y.XmlFragment())
                    break
                case 'multiselect':
                    ymap.set(key, new Y.Map())
                    break
                case 'object':
                    const map = new Y.Map()
                    initYMapFields(type.fields, map)
                    ymap.set(key, map)
                    break
                case 'oneof':
                    ymap.set(key, new Y.Map())
                    break
                case 'ordered-collection':
                    ymap.set(key, new Y.Array())
                    break
                case 'keyed-collection':
                    ymap.set(key, new Y.Map())
                    break
            }
        }
    })
}
