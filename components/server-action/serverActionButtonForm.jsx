"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { SpinnerButtonServer } from "../ui/server-button";
const initialState = null;
export function ServerActionButtonForm({
  callbackFn,
  value,
  btnName,
  inputName,
}) {
  const [state, formAction] = useFormState(callbackFn, initialState);
  useEffect(() => {
    if (state) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="text" defaultValue={value} name={inputName} hidden />
      <SpinnerButtonServer name={btnName} />
    </form>
  );
}
