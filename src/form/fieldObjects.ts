import { HTMLInputTypeAttribute } from "react";
import { ZodTypeAny, z } from "zod";

type Option = {
  label: string;
  value: any;
};

export interface FieldObject {
  [key: string]: {
    default: string;
    initial: string;
    constraint: ZodTypeAny;
    ui: {
      label: string;
      placeholder: string;
      type?: HTMLInputTypeAttribute; //If type na then not visible
      options?: Array<Option>;
      className?: string;
      onAdd?: () => any;
    };
  };
}
