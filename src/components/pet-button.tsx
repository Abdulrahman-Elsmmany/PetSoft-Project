"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function PetButton({
  actionType,
  disabled,
  onClick,
  children,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Checkout
  if (actionType === "checkout") {
    return (
      <Button variant={"secondary"} onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  }

  // Add and Edit
  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size={"icon"}>
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant={"secondary"} onClick={onClick}>
              {children}
            </Button>
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "add" ? "Add a New Pet" : "Edit Pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => {
              flushSync(() => setIsFormOpen(false));
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return <Button></Button>;
}
