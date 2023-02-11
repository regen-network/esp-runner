import {spectrumClassName} from "../../../spectrumUtil";
import React from "react";
import {useProvider} from "@adobe/react-spectrum";

export const FieldLabel = ({label, id}: {id: string, label: string }): JSX.Element => {
    const ctx = useProvider()
    return <span id={id} className={spectrumClassName(ctx, 'spectrum-FieldLabel', 'spectrum-FieldLabel--sizeS')}>{label}</span>
}