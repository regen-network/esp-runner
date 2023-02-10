import {Checkbox} from '@adobe/react-spectrum'
import React from "react";
import * as Y from 'yjs';
import {SelectValue} from "../../../model/FormSchema";
import {useYMapValue} from "../../../yutil";

export interface MultiSelectFieldProps {
    label: string
    ymap: Y.Map<any>
    selectValues: SelectValue[]
}

export const MultiSelectField = ({label, ymap, selectValues}: MultiSelectFieldProps): JSX.Element =>
    <div>
        <p>{label}</p>
        {selectValues.map(value => {
            const [checked] = useYMapValue(ymap, value.value)
            return <span><Checkbox key={value.value} value={value.value} onChange={isSelected => {
                if (isSelected) {
                    ymap.set(value.value, true)
                } else {
                    ymap.delete(value.value)
                }
            }} isSelected={!!checked}
            > {value.label} </Checkbox></span>
        })}
    </div>
