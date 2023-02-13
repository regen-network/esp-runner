import {Checkbox} from '@adobe/react-spectrum'
import React, {useId} from "react";
import {FieldLabel} from "./FieldLabel";

export interface CheckboxFieldProps {
    label: string
    value: boolean
    onChange: (value: boolean) => void
}

export const CheckBoxField = ({label, value, onChange}: CheckboxFieldProps): JSX.Element => {
    const id = useId()
    // noinspection PointlessBooleanExpressionJS
    return <Checkbox onChange={e => onChange(e)}
                     aria-labelledby={id}
                     isSelected={!!value} // !!value is required to make this consistently a component */}
    >
        <FieldLabel id={id} label={label}/>
    </Checkbox>
}
