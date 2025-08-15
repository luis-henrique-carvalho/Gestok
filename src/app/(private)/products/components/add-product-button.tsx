"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertProductForm from "./upsert-product-form";

const AddProductButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Adicionar Paciente</Button>
      </DialogTrigger>

      <UpsertProductForm
        onSuccess={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      />
    </Dialog>
  );
};

export default AddProductButton;
