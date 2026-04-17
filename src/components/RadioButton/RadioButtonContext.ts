import * as React from 'react'

export interface RadioGroupCtx {
  readOnly: boolean
  disabled: boolean
}

export const RadioButtonGroupContext = React.createContext<RadioGroupCtx>({
  readOnly: false,
  disabled: false,
})
