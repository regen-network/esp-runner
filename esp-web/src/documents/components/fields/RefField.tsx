import {Item, Picker} from "@adobe/react-spectrum";
import {useContext} from "react";
import {DocContext} from "../../model/DocContext";
import {useYMapKeys, useYMapValue} from "../../../yutil";

export interface RefFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    refPath: string
}

export const RefField = ({label, value, onChange, refPath}: RefFieldProps): JSX.Element => {
    const doc = useContext(DocContext)
    if(!doc) {
        throw 'RefField must be used inside of a form with DocContext set'
    }
    const pathParts = refPath.split('/')
    if(pathParts.length == 0) {
        throw 'Empty path'
    }
    let refSet = doc
    for (let i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i]
        const [value] = useYMapValue(refSet, pathPart)
        if(!value) {
            throw 'Expected refPath ' + refPath + ' to point to a keyed collection'
        }
        refSet = value
    }
    const refKeys = useYMapKeys(refSet)
    return <Picker label={label} selectedKey={value || null} //null makes this a controlled component
            onSelectionChange={selected => onChange(selected as string)}>
        {Array.from(refKeys, (key =>
            <Item key={key}>{key}</Item>
        ))}
    </Picker>
}
