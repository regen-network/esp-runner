import {Field, DocSchema} from "./DocSchema";
import * as Y from "yjs";
import {resolveFields} from "./SchemaContext";

export function initYMap(schema: DocSchema|null, ymap: Y.Map<any>) {
    console.log('initYMap')
    schema && schema.pages && schema.pages.forEach(page => initYMapFields(schema, page.fields, ymap))
}

export function initYMapFields(schema: DocSchema|null, fields: Field[], ymap: Y.Map<any>) {
    fields && fields.forEach(field => {
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
                    initYMapFields(schema, resolveFields(schema, type.objectDef), map)
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
                case 'code':
                    ymap.set(key, new Y.Text())
            }
        } else {
            console.log('has', key, ymap.get('key'));
        }
    })
}
