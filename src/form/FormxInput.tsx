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
  onFocusChanged,
}: FormInputProps) => (
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

export default FormxInput;

export const isFormInput = (field: any): field is FormInputProps =>
  "type" in field;
