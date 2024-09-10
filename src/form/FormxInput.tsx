import React from "react";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
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
}
const FormxInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  className,
}: FormInputProps) => (
  <div className={cn(className)}>
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default FormxInput;

export const isFormInput = (field: any): field is FormInputProps =>
  "type" in field;
