import {Item, Picker} from "@adobe/react-spectrum";
import {SelectValue} from "../../model/DocSchema";

export interface SelectFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    selectValues: SelectValue[]
}

export const SelectField = ({label, value, onChange, selectValues}: SelectFieldProps): JSX.Element =>
    <Picker label={label} selectedKey={value || null} //null makes this a controlled component
            onSelectionChange={selected => onChange(selected as string)}>
        {selectValues.map(selectValue =>
            <Item key={selectValue.value}>{selectValue.label}</Item>
        )}
    </Picker>