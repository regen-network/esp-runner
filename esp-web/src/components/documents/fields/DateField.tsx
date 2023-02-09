import {DatePicker, DatePickerProps} from '@mui/x-date-pickers';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {TextField} from "@mui/material";
import {formatISO, parseISO} from 'date-fns'
import {useState} from "react";

export interface DateFieldProps extends Omit<DatePickerProps<Date, Date>, 'value' | 'onChange' | 'renderInput'> {
    // ISO8601 date string
    value: string | null

    onChange: (value: string | null) => void
}

export const DateField = ({value, onChange, ...props}: DateFieldProps): JSX.Element => {
    // we maintain an editing state for values that haven't passed validation and shouldn't propogate
    const [editingState, setEditingState] = useState<Date | null>()
    // default to using the date value passed in the prop
    var dateValue = value ? parseISO(value) : null
    // if the editing state isn't null (when there is an invalid value) we use it instead of the prop
    if (editingState) {
        dateValue = editingState
    }
    return <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            onChange={
                (value) => {
                    setEditingState(value)
                }
            }
            onError={
                //NOTE: onError appears to get called on successful input, so we use it to update the actual state
                (reason, value) => {
                    if (!reason) {
                        onChange(value ? formatISO(value) : null)
                        // clear editing state to use the prop value
                        setEditingState(null)
                    }
                }
            }
            onAccept={
                (value) => {
                    onChange(value ? formatISO(value) : null)
                    // clear editing state to use the prop value
                    setEditingState(null)
                }
            }
            value={dateValue}
            renderInput={
                (params) => <TextField {...params} />
            }
            {...props}
        />
    </LocalizationProvider>
}
