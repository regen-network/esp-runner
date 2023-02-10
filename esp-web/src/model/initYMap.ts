import {ElementType, FormSchema} from "./FormSchema";
import * as Y from "yjs";

export function initYMap(schema: FormSchema, ymap: Y.Map<any>) {
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

