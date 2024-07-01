import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

interface InputxProps {
  control?: Control<any>;
  fieldName: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
}

export const Inputx = ({
  control,
  fieldName,
  label,
  placeholder,
  type,
  className,
}: InputxProps) => (
  <div className={className}>
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
