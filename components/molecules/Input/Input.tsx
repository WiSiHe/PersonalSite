import type { TextFieldProps, ValidationResult } from "react-aria-components"
import {
    FieldError,
    Input as InputField,
    Label,
    Text,
    TextField,
} from "react-aria-components"

interface Input extends TextFieldProps {
    label: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
}

function Input({ label, description, errorMessage, ...props }: Input) {
    return (
        <TextField className="flex flex-col w-fit" {...props}>
            <Label>{label}</Label>
            <InputField />
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
        </TextField>
    )
}

export default Input
