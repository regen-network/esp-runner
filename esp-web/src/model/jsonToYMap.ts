import {ElementType, Field, FormSchema} from "./FormSchema";
import * as Y from "yjs";

export function jsonToYMap(schema: FormSchema, ymap: Y.Map<any>, json: any) {
    setFields(schema.fields, ymap, json)
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
