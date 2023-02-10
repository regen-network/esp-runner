import {Checkbox} from '@adobe/react-spectrum'
import React from "react";

export interface CheckboxFieldProps {
    label: string
    value: boolean
    onChange: (value: boolean) => void
}

export const CheckBoxField = ({label, value, onChange}: CheckboxFieldProps): JSX.Element =>
    <p>
        <Checkbox onChange={e => onChange(e)} isSelected={value}>
            {label}
        </Checkbox>
    </p>
