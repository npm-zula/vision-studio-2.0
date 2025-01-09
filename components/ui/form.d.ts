import * as React from "react"
import { ControllerProps, FieldValues, Path }from "react-hook-form"

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  name: TName
}

export interface FormItemContextValue {
  id: string
}

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  render: (props: { field: any }) => React.ReactNode
}

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends React.ComponentProps<"form"> {
  form: UseFormReturn<TFieldValues>
}