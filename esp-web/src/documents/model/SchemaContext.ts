import {createContext} from "react";
import {Field, DocSchema, ObjectDef} from "./DocSchema";

export const SchemaContext = createContext<DocSchema | null>(null);

export function resolveFields(schema: DocSchema|null, objectDef?: ObjectDef): Field[] {
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

