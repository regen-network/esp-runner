import {Checkbox} from '@adobe/react-spectrum'
import React from "react";

export interface CheckboxFieldProps {
    label: string
    value: boolean
    onChange: (value: boolean) => void
}

// noinspection PointlessBooleanExpressionJS
export const CheckBoxField = ({label, value, onChange}: CheckboxFieldProps): JSX.Element =>
    <p>
        <Checkbox onChange={e => onChange(e)} isSelected={!!value}> {/*// !!value is required to make this consistently a component */}
            {label}
        </Checkbox>
    </p>
