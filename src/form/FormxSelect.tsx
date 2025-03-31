import React, { ReactNode } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Control } from "react-hook-form";

export interface FormSelectProps {
  control?: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
  className?: string;
  onAdd?: () => any;
  description?: ReactNode;
}
const FormxSelect = ({
  control,
  name,
  label,
  placeholder,
  options,
  className,
  onAdd,
  description,
}: FormSelectProps) => (
  <div className={cn(className)}>
    <div className="flex w-full gap-2">
      <div className="flex-1">
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
      {onAdd ? (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="flex-1"></div>
          <Button
            type="button"
            variant="secondary"
            onClick={onAdd}
            className={cn(!!onAdd ? "visible" : "hidden")}
          >
            <PlusIcon />
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  </div>
);

export default FormxSelect;

export const isFormSelect = (field: any): field is FormSelectProps =>
  "options" in field;
