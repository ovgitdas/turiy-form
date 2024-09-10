import React, { HTMLInputTypeAttribute, ReactElement } from "react";
import { Eq, UnEq } from "./validation";

interface FormxSelectProps {
  options: Array<{ label: string; value: string }>;
  onAdd?: () => any;
}

interface FormxFieldProps {
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  defaultValue: string;
  type: HTMLInputTypeAttribute | "select";
  selectProps?: FormxSelectProps;
  required?: boolean;
  match?: RegExp | Eq | UnEq;
}

const FormxField = React.forwardRef((props: FormxFieldProps, ref) => <></>);

export type FormxFieldElement = ReactElement<
  FormxFieldProps,
  typeof FormxField
>;

FormxField.displayName = "FormxField";
export { FormxField };
