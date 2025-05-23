import React, { ReactNode } from "react";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "../ui/form";
import { cn } from "../lib/utils";
import { Control } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

export interface FormInputProps {
  control?: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  onFocusChanged: (focus: boolean) => any;
}
const FormxInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  className,
  description,
  disabled,
  required,
  autoFocus,
  onFocusChanged,
}: FormInputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (!!ref.current && !!autoFocus) ref.current.focus();
  }, [autoFocus, ref]);
  return (
    <div className={cn(className)}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {!disabled && !!required ? (
                <span className="text-red-700">*</span>
              ) : (
                <></>
              )}
              {label}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                ref={ref}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                required={!disabled && !!required}
                onFocus={() => onFocusChanged(true)}
                onBlur={() => onFocusChanged(true)}
              />
            </FormControl>
            {!!description ? (
              <FormDescription>{description}</FormDescription>
            ) : (
              <></>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormxInput;

export const isFormInput = (field: any): field is FormInputProps =>
  "type" in field;
