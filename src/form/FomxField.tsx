import React, { HTMLInputTypeAttribute, ReactElement, ReactNode } from "react";
import { Eq, UnEq } from "./validation";

interface FormxSelectProps {
  options: Array<{ label: string; value: string }>;
  onAdd?: () => any;
}

interface FormxFieldProps {
  name: string;
  label: string;
  placeholder: string;
  description?: ReactNode;
  className?: string;
  defaultValue: string;
  type: HTMLInputTypeAttribute | "select";
  selectProps?: FormxSelectProps;
  required?: boolean;
  match?: RegExp | Eq | UnEq;
  cached?: boolean;
}

const FormxField = React.forwardRef((props: FormxFieldProps, ref) => <></>);

export type FormxFieldElement = ReactElement<
  FormxFieldProps,
  typeof FormxField
>;

FormxField.displayName = "FormxField";
export { FormxField };
