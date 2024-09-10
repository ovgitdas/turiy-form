import { UseFormReturn } from "react-hook-form";

export const reset = (form: UseFormReturn<any>, defaultValues: any) =>
  Object.entries(defaultValues).forEach(([key, value]) =>
    form.setValue(key as any, `${value}`)
  );

export function equal<T>(obj1: T, obj2: T): boolean {
  const areObjects = isObject(obj1) && isObject(obj2);
  if (!areObjects) return obj1 === obj2;

  // Get the keys of both objects
  const keys1 = Object.keys(obj1 as object) as (keyof T)[];
  const keys2 = Object.keys(obj2 as object) as (keyof T)[];

  // If the number of keys is different, the objects are not equal
  if (keys1.length !== keys2.length) return false;

  // Compare each key-value pair
  for (const key of keys1) if (!equal(obj1[key], obj2[key])) return false;

  return true;
}

// Helper function to check if a value is an object
export function isObject(value: any): boolean {
  return value !== null && typeof value === "object";
}
