import {createContext} from "react";
import {Field, DocSchema, ObjectDef} from "./DocSchema";

export const SchemaContext = createContext<DocSchema | null>(null);

export function resolveFields(schema: DocSchema | null, objectDef?: ObjectDef): Field[] {
    if (!objectDef) {
        return []
    }

    switch (objectDef.type) {
        case 'fields-def':
            return objectDef.fields
        case 'object-ref':
            if (objectDef.ref) {
                const objectTypes = schema?.objectTypes
                if (objectTypes) {
                    const def = objectTypes[objectDef.ref]
                    if (!def) {
                        return []
                    }
                    return def.fields
                }
            }
    }
    return []
}

