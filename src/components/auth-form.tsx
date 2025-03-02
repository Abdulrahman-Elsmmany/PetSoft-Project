"use client";

import { logIn, signUp } from "@/actions/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchlogIn] = useFormState(logIn, undefined);

  return (
    <form
      action={type === "login" ? dispatchlogIn : dispatchSignUp}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required maxLength={100} />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          maxLength={100}
        />
      </div>

      <AuthFormBtn type={type} />
      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
}
