import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Selectx } from "./Selectx";
import { Inputx } from "./Inputx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldObject } from "./fieldObjects";

const getFormSchema = (fields: FieldObject) => {
  let zObject = {};
  for (const key in fields) {
    zObject = { ...zObject, [key]: fields[key].constraint };
  }
  return z.object(zObject);
};

const getDefaultValues = (fields: FieldObject) => {
  let dv = {};
  for (const key in fields) {
    dv = { ...dv, [key]: fields[key].default };
  }
  return dv;
};

const getInitialValues = (fields: FieldObject) => {
  let v = {};
  for (const key in fields) {
    v = { ...v, [key]: fields[key].initial };
  }
  return v;
};

// const setInitialValues = (form: UseFormReturn, fields: FieldObject) => {
//   for (const key in fields) {
//     form.setValue(key, fields[key].initial);
//   }
// };

const getUi = (fields: FieldObject) => {
  let ui = [];
  for (const key in fields) {
    ui.push({
      name: key,
      ...fields[key].ui,
    });
  }
  return ui;
};

interface SubmitxProps {
  label: string;
  onSubmit: (values: { [key: string]: string }) => any;
  disabled: boolean;
  className: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

interface FormxProps {
  containerClassName: string;
  contentClassName: string;
  fields: FieldObject;
  submit: SubmitxProps;
}

export const Formx: React.FC<FormxProps> = ({
  containerClassName,
  contentClassName,
  fields,
  submit,
}) => {
  const formSchema = getFormSchema(fields);
  const defaultValues = getDefaultValues(fields);
  const initialValues = getInitialValues(fields);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: initialValues,
  });

  const ui = getUi(fields);

  return (
    <div className={containerClassName}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit.onSubmit)}
          className="space-y-8"
        >
          <div className={contentClassName}>
            {ui.map((f) =>
              !!f.options ? (
                <Selectx
                  key={f.name}
                  control={form.control}
                  fieldName={f.name}
                  label={f.label}
                  placeholder={f.placeholder}
                  options={f.options}
                  className={f.className}
                  onAdd={f.onAdd}
                />
              ) : (
                <Inputx
                  key={f.name}
                  control={form.control}
                  fieldName={f.name}
                  label={f.label}
                  placeholder={f.placeholder}
                  type={f.type}
                  className={f.className}
                />
              )
            )}
            <Button
              className={submit.className}
              variant={submit.variant}
              type="submit"
              disabled={submit.disabled}
            >
              {submit.label}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
