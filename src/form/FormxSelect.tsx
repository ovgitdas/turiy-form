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
  disabled?: boolean;
  required?: boolean;
  onFocusChanged: (focus: boolean) => any;
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
  disabled,
  required,
  onFocusChanged,
}: FormSelectProps) => (
  <div className={cn(className)}>
    <div className="flex w-full gap-2">
      <div className="flex-1">
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                {!disabled && !!required ? (
                  <span className="text-red-700">*</span>
                ) : (
                  <></>
                )}
                {label}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={disabled}
                required={!disabled && !!required}
                onOpenChange={(focused) => onFocusChanged(focused)}
              >
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
            disabled={disabled}
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
