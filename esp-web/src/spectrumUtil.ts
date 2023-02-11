import '@spectrum-css/vars/dist/spectrum-global.css'
import '@spectrum-css/vars/dist/spectrum-large.css'
import '@spectrum-css/vars/dist/spectrum-medium.css'
import '@spectrum-css/vars/dist/spectrum-light.css'
import '@spectrum-css/vars/dist/spectrum-dark.css'
import '@spectrum-css/tokens/dist/index.css';
import '@spectrum-css/fieldgroup/dist/index-vars.css';
import '@spectrum-css/fieldlabel/dist/index-vars.css';
import {ProviderContext} from "@react-spectrum/provider";

export function spectrumClassName(ctx: ProviderContext, ...classes: string[]):string {
    let classNames = []
    classNames.push('spectrum')
    if (ctx.colorScheme == 'dark') {
        classNames.push('spectrum--dark')
    } else {
        classNames.push('spectrum--light')
    }

    if (ctx.scale == 'medium') {
        classNames.push('spectrum--medium')
    } else {
        classNames.push('spectrum--large')
    }

    classNames.push(...classes)

    return classNames.join(' ')
}