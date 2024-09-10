import { z } from "zod";

export interface Eq {
  type: "string";
  eq: number;
}

export interface UnEq {
  type: "string" | "number";
  min?: number;
  max?: number;
}

type Eqx = Eq | UnEq;

export const zValid = (
  label: string,
  required: boolean,
  match?: RegExp | Eq | UnEq
) =>
  z
    .string(required ? { required_error: `${label} is required!` } : undefined)
    .refine(
      (x) =>
        required || x.length > 0
          ? !!match
            ? !!(match as Eqx).type
              ? //for string
                ((match as Eqx).type === "string" &&
                  (!(match as Eq).eq || x.length === (match as Eq).eq) &&
                  (!(match as UnEq).min ||
                    x.length >= ((match as UnEq).min ?? x.length)) &&
                  (!(match as UnEq).max ||
                    x.length <= ((match as UnEq).max ?? x.length))) ||
                //for number
                (!isNaN(x as any) &&
                  (!(match as UnEq).min || +x >= ((match as UnEq).min ?? +x)) &&
                  (!(match as UnEq).max || +x <= ((match as UnEq).max ?? +x)))
              : x.match(match as any)
            : true
          : true,
      !!match
        ? !!(match as Eqx).type
          ? `${label} ${
              (match as Eqx).type === "string" ? "length" : ""
            } should be ${!!(match as Eq).eq ? `=${(match as Eq).eq}` : ""} ${
              !!(match as UnEq).min
                ? `>=${(match as UnEq).min} ${
                    !!(match as UnEq).max ? `<=${(match as UnEq).max}` : ""
                  }`
                : ""
            } !`
          : `Invalid ${label}!`
        : ""
    );

export const regex = {
  email: /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})$/i,
  mobile: /^\+?[1-9]\d{1,14}$/,
  url: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  aadhar: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
  cin: /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
  epic: /^[A-Z]{3}[0-9]{7}$/,
  pin: /^[1-9][0-9]{2}\s?[0-9]{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/,
};

/*
Password:
Is at least 6 characters long.
Contains at least one uppercase letter.
Contains at least one lowercase letter.
Contains at least one number.
Contains at least one special character (e.g., @$!%*?&)
*/
