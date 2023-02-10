import {DatePicker} from '@adobe/react-spectrum'
import {getLocalTimeZone, parseDate, today} from '@internationalized/date';

export interface DateFieldProps {
    label: string

    // ISO8601 date string
    value: string | null

    onChange: (value: string | null) => void
}

export const DateField = ({label, value, onChange}: DateFieldProps): JSX.Element => {
    // // we maintain an editing state for values that haven't passed validation and shouldn't propogate
    // const [editingState, setEditingState] = useState<Date | null>()
    // // default to using the date value passed in the prop
    // var dateValue = value ? parseISO(value) : null
    // // if the editing state isn't null (when there is an invalid value) we use it instead of the prop
    // if (editingState) {
    //     dateValue = editingState
    // }
    const dateValue = value ? parseDate(value) : today(getLocalTimeZone())
    return <DatePicker
        label={label}
        value={dateValue}
        onChange={value => onChange(value.toString())}
    />
}
