# Turiy Form Package

This package is made on `react`, `react-dom`, `zod`,`tailwindcss`, `shadcn`, `radix-ui` and `react-hook-form`.

> This is actually help to create a form with validator.

> **Recommended** to use inside `react components` .

## Create your own `FormxField` and send it to `Formx`

```typescript
//Example given for NextJS
"use client";
import React from "react";
import { Formx, FormxField, regex, equal, Button } from "turiy-form";
import { useToast } from "@/hooks/use-toast"; //toast from shadcn

const signupDefaultValue = {
  email: "",
  password: "",
  cpassword: "",
  uname: "",
  gender: "",
  mob: "",
};

const SignupForm = () => {
  const [busy, setBusy] = React.useState(false);

  function onSubmit(values: any) {
    if (equal(signupDefaultValue, values)) {
      toast({
        title: "😎 No change!",
        description: " You have not made any changes.",
        variant: "destructive",
      });
      return;
    }
    setBusy(true);
    //Todo: do your stuffs here
    setBusy(false);
  }

  return (
    <Formx
      className="grid grid-cols-1 gap-4 text-slate-950"
      onSubmit={onSubmit}
      submitButton={
        <Button type="submit" className="mx-auto px-8">
          Send reset link
        </Button>
      }
      refine={{
        //Compare on form fields
        on: (data: any) => data.password === data.cpassword,
        //Error message if above is false
        message: "Please confirm your password",
        //Field name where message will be shown
        path: ["cpassword"],
      }}
    >
      <FormxField
        name="email"
        label="Email"
        placeholder="abc@xyz.com"
        type="email"
        required
        match={regex.email}
        defaultValue=""
      />
      <FormxField
        name="password"
        label="Password"
        placeholder="Password like $hRk25!n"
        type="password"
        required
        match={regex.password}
        defaultValue=""
      />
      <FormxField
        name="cpassword"
        label="Confirm Password"
        placeholder="Type the password again"
        type="password"
        required
        match={regex.password}
        defaultValue=""
      />
      <FormxField
        name="uname"
        label="Your name"
        placeholder="Write your name"
        type="text"
        required
        match={{ type: "string", min: 3 }}
        defaultValue=""
      />
      <FormxField
        name="gender"
        label="Gender"
        placeholder="Gender"
        type="select"
        required
        defaultValue=""
        selectProps={{
          options: [
            { label: "Male", value: "1" },
            { label: "Female", value: "2" },
            { label: "Other", value: "3" },
          ],
        }}
      />
      <FormxField
        name="mob"
        label="Mobile no."
        placeholder="+91XXXXXXXXXX"
        type="tel"
        required
        match={regex.mobile}
        defaultValue=""
      />
    </Formx>
  );
};

export default SignupForm;
```
