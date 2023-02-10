import {Field, FormSchema} from "./FormSchema";
import * as Y from "yjs";

export function jsonToYMap(schema: FormSchema, ymap: Y.Map<any>, json: any) {
    schema.pages.forEach(page =>
        setFields(page.fields, ymap, json)
    )
}

function setFields(fields: Field[], ymap: Y.Map<any>, initContent: any) {
    fields.forEach(field => {
        const key = field.name
        const val = initContent[key]
        const type = field.type
        switch (type.type) {
            case 'text':
            case 'object':
            case "oneof":
                const arr = new Y.Array()
                // TODO
                ymap.set(key, arr)
                break;
            case 'date':
            case "number":
                const map = new Y.Map()
                val.forEach((x: any) => {
                    map.set(x.toString(), true)
                })
                ymap.set(key, map)
        }
    })
}
