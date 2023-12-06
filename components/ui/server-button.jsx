"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
export const SpinnerButtonServer = ({ name, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled {...props}>
          <ReloadIcon className=" mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button {...props} type="submit">
          {name}
        </Button>
      )}
    </>
  );
};
