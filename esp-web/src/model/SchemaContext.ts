import {createContext, useContext} from "react";
import {Field, FormSchema, ObjectDef} from "./FormSchema";

export const SchemaContext = createContext<FormSchema | null>(null);

export function resolveFields(objectDef?: ObjectDef): Field[] {
    const schema = useContext(SchemaContext)
    if (!objectDef) {
        return []
    }

    switch (objectDef.type) {
        case 'fields-def':
            return objectDef.fields
        case 'object-ref':
            const objectTypes = schema?.objectTypes
            if(objectTypes) {
                const def = objectTypes[objectDef.ref]
                if (!def) {
                    throw "can't find object ref " + objectDef.ref
                }
                return def.fields
            }
    }
    return []
}

