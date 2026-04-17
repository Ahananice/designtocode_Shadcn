import * as React from 'react'

export interface CheckboxGroupCtx {
  readOnly: boolean
  disabled: boolean
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupCtx>({
  readOnly: false,
  disabled: false,
})
