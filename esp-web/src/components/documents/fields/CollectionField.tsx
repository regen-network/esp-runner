import {Fab, IconButton, List, ListItem, Stack} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from "react";
import * as Y from 'yjs';
import {useYArray} from "../../../yutil";

export interface CollectionFieldProps<T extends Y.AbstractType<any>> {
    yarray: Y.Array<T>,
    newElement: () => T
    editElement: (value: T) => React.ReactElement
}

export function CollectionField<T extends Y.AbstractType<any>>({
                                                                   yarray,
                                                                   editElement,
                                                                   newElement
                                                               }: CollectionFieldProps<T>): JSX.Element {
    const elements = useYArray(yarray)
    return <Stack>
        <List>
            {
                elements.map(
                    (element, index) =>
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton onClick={
                                    () => {
                                        yarray.delete(1, 1)
                                    }
                                }>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        >
                            {editElement(element)}
                        </ListItem>
                )
            }
        </List>
        <Fab onClick={() => {
            yarray.push([newElement()])
        }}>
            <AddIcon/>
        </Fab>
    </Stack>
}