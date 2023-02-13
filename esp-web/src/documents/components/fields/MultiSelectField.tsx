import {Checkbox, useProvider} from '@adobe/react-spectrum'
import React, {useId} from "react";
import * as Y from 'yjs';
import {SelectValue} from "../../model/DocSchema";
import {useYMapValue} from "../../../yutil";
import {spectrumClassName} from "../../../spectrumUtil";
import {FieldLabel} from "./FieldLabel";

export interface MultiSelectFieldProps {
    label: string
    ymap: Y.Map<any>
    selectValues: SelectValue[]
}

export const MultiSelectField = ({label, ymap, selectValues}: MultiSelectFieldProps): JSX.Element => {
    const ctx = useProvider()
    const labelId = useId()
    return <div
        className={spectrumClassName(ctx, 'spectrum-FieldGroup', 'spectrum-FieldGroup--toplabel', 'spectrum-FieldGroup--vertical')}
        role="group"
        aria-labelledby={labelId}
    >
        <FieldLabel id={labelId} label={label}/>
        {selectValues.map(value => {
            const [checked] = useYMapValue(ymap, value.value)
            const checkId = useId()
            return <Checkbox key={value.value} value={value.value} onChange={isSelected => {
                if (isSelected) {
                    ymap.set(value.value, true)
                } else {
                    ymap.delete(value.value)
                }
            }} isSelected={!!checked} aria-labelledby={checkId}
            > <FieldLabel id={useId()} label={value.label}/> </Checkbox>
        })}
    </div>
}