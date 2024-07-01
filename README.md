# Turiy Form Package

This package is made on `react`, `tailwindcss`, `shadcn`, `radix-ui`, `zod` and `react-hook-form`. This is actually help to create a form with validator.

> **Recommended** to use inside `react components` .

## Create your own `FieldObject` and send it to `Formx`

```typescript
export interface FieldObject {
  [key: string]: {
    default: string;
    initial: string;
    constraint: ZodTypeAny;
    ui: {
      label: string;
      placeholder: string;
      type?: HTMLInputTypeAttribute; //If type na then not visible
      options?: Array<{ label: string; value: string }>;
      className?: string;
      onAdd?: () => any;
    };
  };
}
```

## `Formx` accepts following props

```typescript
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
```
