import * as Y from 'yjs';
import {useYArray, useYJSON, useYMapValue} from "../../yutil";
import {getTextFieldText, TextField} from "./fields/TextField";
import {DateField} from "./fields/DateField";
import {Field, FormSchema, Type} from "../../model/FormSchema";
import {initYMap, initYMapFields} from "../../model/initYMap";
import {Box, Step, StepButton, Stepper} from "@mui/material";
import React, {Key, useState} from "react";
import {RichTextField} from "./fields/RichTextField";
import {CheckBoxField} from "./fields/CheckboxField";
import {MultiSelectField} from "./fields/MultiSelectField";
import {SelectField} from "./fields/SelectField";
import {
    ActionGroup, Button, ButtonGroup,
    Cell, Column, Content, Dialog, DialogContainer, Divider, Flex,
    Form, Heading, Item, Row, TableBody, TableHeader, TableView, View,
    TextField as SpectrumTextField
} from "@adobe/react-spectrum";

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
        case 'string':
            return <SpectrumTextField label={field.label} value={value} onChange={setValue}/>
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
        case 'ordered-collection':
            return <OrderedCollectionField label={field.label} fields={type.fields} yarray={value}/>
        case 'keyed-collection' :
            return <KeyedCollectionField label={field.label} fields={type.fields} ymap={value}
                                         idFieldLabel={type.keyLabel}
            />
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
                                }: { label: string, fields: Field[], yarray: Y.Array<Y.Map<any>> }): JSX.Element => {
    return <CollectionField
        fields={fields}
        yany={yarray}
        label={label}
        addItem={x => yarray.push([x])}
        getItem={x => yarray.get(x as number)}
        map={(json, f) => {
            return json.map((elem: any, idx: any) => f(elem, idx as Key))
        }}
        deleteItems={items => {
            if (items == 'all') {
                yarray.delete(0, yarray.length)
            } else {
                items.forEach(i =>
                    yarray.delete(i as number, 1)
                )
            }
        }
        }
    />
}

const KeyedCollectionField = ({
                                  fields,
                                  ymap,
                                  label,
                                  idFieldLabel,
                              }: { label: string, fields: Field[], ymap: Y.Map<any>, idFieldLabel?: string }): JSX.Element => {
    const idField: Field = {
        name: '@id',
        label: idFieldLabel || 'ID',
        type: {type: 'string'}
    }
    const newFields: Field[] = [idField].concat(fields)
    return <CollectionField
        fields={newFields}
        yany={ymap}
        label={label}
        addItem={x => {
            let id = x.get('@id')
            if (!id) {
                id = crypto.randomUUID()
                x.set('@id', id)
            }
            ymap.set(id, x)
        }}
        getItem={x => ymap.get(x as string)}
        map={(json, f) => {
            return Object.keys(json).map(key => {
                let elem = json[key]
                return f(elem, key)
            })
        }}
        deleteItems={items => {
            if (items == 'all') {
                ymap.clear()
            } else {
                items.forEach(x =>
                    ymap.delete(x as string)
                )
            }
        }
        }
    />
}

const CollectionField = ({fields, yany, label, getItem, addItem, deleteItems, map,}: {
    label: string, fields: Field[], yany: Y.AbstractType<any>,
    getItem: (key: Key) => any,
    addItem: (x: any) => void,
    deleteItems: (items: Set<Key> | 'all') => void,
    map: (json: any, f: (elem: any, key: Key) => any) => any[]
}): JSX.Element => {
    const json: any = useYJSON(yany)
    const [activeItem, setActiveItem] = useState(new Y.Map())
    const [dialogState, setDialogState] = useState<string | null>()
    const stringableFields = fields.filter(field => isStringableType(field.type))
    const [selectedFields, setSelectedFields] = useState<Set<Key> | 'all'>()
    return <View
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        padding="size-50"
    >
        <Heading level={3}>{label}</Heading>
        <TableView selectionMode="multiple" onSelectionChange={e => setSelectedFields(e)}
                   onAction={key => {
                       setActiveItem(getItem(key))
                       setDialogState('edit')
                   }}
        >
            <TableHeader>
                {stringableFields.map((field) =>
                    <Column>{field.label}</Column>)}
            </TableHeader>
            <TableBody>
                {map(json, (elem, idx) =>
                    <Row key={idx}>
                        {stringableFields.map((field) =>
                            <Cell>{valueToString(field.type, elem[field.name])}</Cell>)}
                    </Row>)}
            </TableBody>
        </TableView>
        <Flex direction="column">
            <ActionGroup onAction={action => {
                switch (action) {
                    case 'add':
                        const x = new Y.Map()
                        initYMapFields(fields, x)
                        setDialogState('edit')
                        addItem(x)
                        setActiveItem(x)
                        break
                    case 'remove':
                        if (selectedFields) {
                            deleteItems(selectedFields)
                        }
                        break
                }
            }}>
                <Item key="add">Add</Item>
                <Item key="remove">Remove</Item>
            </ActionGroup>
            <DialogContainer onDismiss={() => {
                setDialogState(null)
            }} isDismissable={true} type="fullscreen">
                {dialogState === 'edit' &&
                    <Dialog>
                        <Heading>Edit</Heading>
                        <Divider/>
                        <Content>
                            {fields.map((field) =>
                                <FormField key={field.name} field={field} ymap={activeItem}/>
                            )}
                        </Content>
                        <ButtonGroup>
                            <Button variant="primary" onPress={_ => setDialogState(null)}>Done</Button>
                        </ButtonGroup>
                    </Dialog>}
            </DialogContainer>
        </Flex>
    </View>
}

function isStringableType(type: Type): boolean {
    switch (type.type) {
        case 'string':
        case 'text':
        case 'date':
            return true
        default:
            return false
    }
}

function valueToString(type: Type, value: any): any {
    switch (type.type) {
        case 'string':
            return value
        case 'text':
            return getTextFieldText(value)
        case 'date':
            return value
        default:
            return ""
    }
}
