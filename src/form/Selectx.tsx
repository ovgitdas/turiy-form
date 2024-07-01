import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
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
import { Control } from "react-hook-form";

interface SelectxProps {
  control?: Control<any>;
  fieldName: string;
  label: string;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
  className?: string;
  onAdd?: () => any;
}

export const Selectx = ({
  control,
  fieldName,
  label,
  placeholder,
  options,
  className,
  onAdd,
}: SelectxProps) => (
  <div className={className}>
    <div className="flex-1">
      <FormField
        control={control}
        name={fieldName}
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
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    {onAdd ? (
      <Button
        type="button"
        variant="outline"
        onClick={onAdd}
        className="mt-auto"
      >
        <PlusIcon />
      </Button>
    ) : (
      <></>
    )}
  </div>
);
