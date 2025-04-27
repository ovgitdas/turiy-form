import React, { ReactNode } from "react";
import { Form } from "../ui/form";
import { cn } from "../lib/utils";
import { FormxField, FormxFieldElement } from "./FomxField";
import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormxSelect from "./FormxSelect";
import FormxInput from "./FormxInput";
import { zValid } from "./validation";

interface FormxProps {
  children: FormxFieldElement | Array<FormxFieldElement>;
  className?: string;
  onSubmit: (data: { [name: string]: string }) => any;
  onChange?: (data: {
    [name: string]: string;
    selectedFieldName: string;
  }) => any;
  onInit: (form: UseFormReturn) => any;
  refine?: {
    on: (data: { [name: string]: string }) => boolean;
    message: string;
    path: Array<string>;
  };
  submitButton?: ReactNode;
  resetButton?: ReactNode;
}

const Formx = ({
  children,
  className,
  onSubmit,
  onChange,
  onInit,
  refine,
  submitButton,
  resetButton,
}: Readonly<FormxProps>) => {
  //Step-1: Read the children props
  const validators: Array<[string, z.ZodEffects<z.ZodString, string, string>]> =
    [];
  const defaultValues: Array<[string, string]> = [];
  const childs: Array<FormxFieldElement> = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      childs.push(child);
      if (child.type === FormxField) {
        validators.push([
          child.props.name,
          zValid(child.props.label, !!child.props.required, child.props.match),
        ]);
        if (child.props.cached) {
          const dv = localStorage.getItem(`cached_${child.props.name}`);
          defaultValues.push([
            child.props.name,
            dv || child.props.defaultValue,
          ]);
        } else {
          defaultValues.push([child.props.name, child.props.defaultValue]);
        }
      }
    }
  });

  //Step-2: Create zod schema
  const validateSchema = z.object(Object.fromEntries(validators));
  const refinedSchema = !!refine
    ? validateSchema.refine((data) => refine.on(data), {
        message: refine.message,
        path: refine.path,
      })
    : validateSchema;
  const defaultSchemaValue = Object.fromEntries(defaultValues);

  //Step-3: Define your form.
  const form = useForm<z.infer<typeof refinedSchema>>({
    resolver: zodResolver(refinedSchema),
    defaultValues: defaultSchemaValue,
  });

  React.useEffect(() => {
    onInit(form);
  }, [form]);

  //~ Allowing auto caching of fields if cached=true is given
  const _onSubmit = (data: { [name: string]: string }) => {
    childs.forEach((c) => {
      if (c.props.cached) {
        localStorage.setItem(`cached_${c.props.name}`, data[c.props.name]);
      }
    });
    onSubmit(data);
  };

  const [selectedFieldName, setSelectedFieldName] = React.useState("");
  const values = form.watch();
  React.useEffect(() => {
    if (!!onChange) {
      onChange({ ...values, selectedFieldName });
    }
  }, [values]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
        <div className={cn(className)}>
          {childs.map((child) =>
            !!child.props.selectProps ? (
              <FormxSelect
                key={child.props.name}
                control={form.control}
                name={child.props.name}
                label={child.props.label}
                placeholder={child.props.placeholder}
                options={child.props.selectProps.options}
                className={child.props.className}
                onAdd={child.props.selectProps.onAdd}
                description={child.props.description}
                disabled={child.props.disabled}
                onFocusChanged={(focused) => {
                  if (focused) {
                    setSelectedFieldName(child.props.name);
                  }
                }}
              />
            ) : (
              <FormxInput
                key={child.props.name}
                control={form.control}
                name={child.props.name}
                label={child.props.label}
                placeholder={child.props.placeholder}
                className={child.props.className}
                type={child.props.type}
                description={child.props.description}
                disabled={child.props.disabled}
                onFocusChanged={(focused) => {
                  if (focused) {
                    setSelectedFieldName(child.props.name);
                  }
                }}
              />
            )
          )}
          {submitButton}
          {resetButton}
        </div>
      </form>
    </Form>
  );
};

Formx.displayName = "Formx";

export { Formx };
