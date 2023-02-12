import {defaultTheme as defaultSpectrumThem, Provider as SpectrumProvider} from '@adobe/react-spectrum';

export const parameters = {
    backgrounds: {
        default: 'light',
    },
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [
    (Story) => (
        <SpectrumProvider theme={defaultSpectrumThem}>
            <Story/>
        </SpectrumProvider>
    ),
];