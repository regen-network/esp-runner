import * as Y from 'yjs';
import {useYArray, useYMapValue} from "../../yutil";
import {TextField} from "./fields/TextField";
import {DateField} from "./fields/DateField";
import {Field, FormSchema} from "../../model/FormSchema";
import {initYMap} from "../../model/initYMap";
import {Box, Checkbox, FormControlLabel, Step, StepButton, Stepper} from "@mui/material";
import React from "react";
import {RichTextField} from "./fields/RichTextField";
import {CheckBoxField} from "./fields/CheckboxField";
import {MultiSelectField} from "./fields/MultiSelectField";
import {SelectField} from "./fields/SelectField";
import {Cell, Column, Form, Heading, Row, TableBody, TableHeader, TableView, View} from "@adobe/react-spectrum";

export interface EditorProps {
    schema: FormSchema
    ymap: Y.Map<any>
}

export const FormEditor = ({schema, ymap}: EditorProps): JSX.Element => {
    initYMap(schema, ymap)
    if (schema.pages.length == 1) {
        const page = schema.pages[0]
        return <Box sx={{width: '100%'}}>
            {page.fields.map((field) =>
                <FormField key={field.name} field={field} ymap={ymap}/>
            )}
        </Box>
    } else {
        const [activeStep, setActiveStep] = React.useState(0);
        return <Box>
            <Stepper nonLinear activeStep={activeStep}>
                {schema.pages.map((page, index) => <Step key={index}>
                    <StepButton onClick={() => setActiveStep(index)}>{page.label}</StepButton>
                </Step>)}
            </Stepper>
            <Form>
                {schema.pages[activeStep].fields.map((field) =>
                    <FormField key={field.name} field={field} ymap={ymap}/>
                )}
            </Form>
        </Box>
    }

}

const FormField = ({field, ymap}: { field: Field, ymap: Y.Map<any> }): JSX.Element => {
    const [value, setValue] = useYMapValue(ymap, field.name)
    const type = field.type
    switch (type.type) {
        case 'text':
            return <TextField label={field.label} fragment={value}/>
        case 'richtext':
            return <RichTextField label={field.label} fragment={value}/>
        case 'date':
            return <DateField label={field.label} onChange={setValue} value={value}/>
        case 'checkbox':
            return <CheckBoxField label={field.label} onChange={setValue} value={value}/>
        case 'multiselect':
            return <MultiSelectField label={field.label} ymap={value} selectValues={type.values}/>
        case 'select':
            return <SelectField label={field.label} value={value} onChange={setValue} selectValues={type.values}/>
        case 'object':
            return <ObjectField label={field.label} fields={type.fields} ymap={value}/>
        case 'ordered-collection': {
            return <OrderedCollectionField label={field.label} fields={type.fields} yarray={value}/>
        }
        default:
            throw 'TODO'
    }
}

const ObjectField = ({fields, ymap, label}: { label: string, fields: Field[], ymap: Y.Map<any> }): JSX.Element => {
    return <View
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        padding="size-50"
    >
        <Heading level={3}>{label}</Heading>
        <React.Fragment>
            {fields.map((field) =>
                <FormField key={field.name} field={field} ymap={ymap}/>
            )}
        </React.Fragment>
    </View>
}

const OrderedCollectionField = ({
                                    fields,
                                    yarray,
                                    label
                                }: { label: string, fields: Field[], yarray: Y.Array<any> }): JSX.Element => {
    // const elems = useYArray(yarray)
    return <div>
        {/*<h3>{label}</h3>*/}
        {/*<TableView>*/}
        {/*    <TableHeader>*/}
        {/*        {fields.map((field) =>*/}
        {/*            <Column>{field.label}</Column>)}*/}
        {/*    </TableHeader>*/}
        {/*    <TableBody>*/}
        {/*        {elems.map(elem =>*/}
        {/*            <Row>*/}
        {/*                {fields.map((field) => {*/}
        {/*                    const [value, setValue] = useYMapValue(elem, field.name)*/}
        {/*                    return <Cell>{value}</Cell>*/}
        {/*                })}*/}
        {/*            </Row>)}*/}
        {/*    </TableBody>*/}
        {/*</TableView>*/}
    </div>
}
