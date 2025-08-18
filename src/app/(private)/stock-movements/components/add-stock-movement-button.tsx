"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertStockMovementForm from "./upsert-stock-movement-form";

const AddStockMovementButton = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Nova Movimentação</Button>
            </DialogTrigger>

            <UpsertStockMovementForm
                onSuccess={() => {
                    setIsOpen(false);
                }}
                isOpen={isOpen}
            />
        </Dialog>
    );
};

export default AddStockMovementButton;
