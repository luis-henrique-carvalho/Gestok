"use client";

import { EditIcon, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { deleteStockMovement } from "../../actions/delete-stock-movement";
import { stockMovementsTable } from "@/drizzle/schema";
import UpsertStockMovementForm from "../upsert-stock-movement-form";

type StockMovement = typeof stockMovementsTable.$inferSelect;

interface Props {
    stockMovement: StockMovement;
}

const TableActions = ({ stockMovement }: Props) => {
    const [upsertDialogIsOpen, setUpsertDialogIsOpen] = React.useState(false);

    const deleteStockMovementAction = useAction(deleteStockMovement, {
        onSuccess: () => {
            toast.success("Movimentação deletada com sucesso.");
        },
        onError: () => {
            toast.error("Erro ao deletar movimentação.");
        },
    });

    const handleDeleteStockMovementClick = () => {
        if (!stockMovement) return;
        deleteStockMovementAction.execute({ id: stockMovement.id });
    };

    const handleEditStockMovementClick = () => {
        setUpsertDialogIsOpen(false);
    };

    return (
        <Dialog open={upsertDialogIsOpen} onOpenChange={setUpsertDialogIsOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        Movimentação #{stockMovement.id}
                    </DropdownMenuLabel>
                    <Separator className="my-1" />
                    <DropdownMenuItem onClick={() => setUpsertDialogIsOpen(true)}>
                        <EditIcon className="mr-2" />
                        Editar
                    </DropdownMenuItem>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2" />
                                Excluir
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Tem certeza que deseja deletar essa movimentação?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser revertida. Isso irá deletar a movimentação
                                    de estoque permanentemente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteStockMovementClick}>
                                    Deletar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>

                <UpsertStockMovementForm
                    onSuccess={handleEditStockMovementClick}
                    stockMovement={stockMovement}
                    isOpen={upsertDialogIsOpen}
                />
            </DropdownMenu>
        </Dialog>
    );
};

export default TableActions;
