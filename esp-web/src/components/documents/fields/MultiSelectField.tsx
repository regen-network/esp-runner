import {Checkbox, useProvider} from '@adobe/react-spectrum'
import React from "react";
import * as Y from 'yjs';
import {SelectValue} from "../../../model/FormSchema";
import {useYMapValue} from "../../../yutil";
import styles from './styles.module.css';
import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-medium.css'
import '@spectrum-css/vars/dist/spectrum-light.css'
import '@spectrum-css/fieldgroup/dist/index-vars.css';
import '@spectrum-css/fieldlabel/dist/index-vars.css';

export interface MultiSelectFieldProps {
    label: string
    ymap: Y.Map<any>
    selectValues: SelectValue[]
}

export const MultiSelectField = ({label, ymap, selectValues}: MultiSelectFieldProps): JSX.Element => {
    return <div className="spectrum-FieldGroup spectrum-FieldGroup--toplabel spectrum-FieldGroup--vertical" role="group">
        <span className={styles['field-label']}>{label}</span>
        {selectValues.map(value => {
            const [checked] = useYMapValue(ymap, value.value)
            return <Checkbox key={value.value} value={value.value} onChange={isSelected => {
                if (isSelected) {
                    ymap.set(value.value, true)
                } else {
                    ymap.delete(value.value)
                }
            }} isSelected={!!checked}
            > {value.label} </Checkbox>
        })}
    </div>
}