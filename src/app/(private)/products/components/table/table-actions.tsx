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

type Product = typeof productTable.$inferSelect;

import { deleteProduct } from "../../actions/delete-product";
import { productTable } from "@/drizzle/schema";
import UpsertProductForm from "../upsert-product-form";

interface Props {
  product: Product;
}

const TableActions = ({ product }: Props) => {
  const [upsertDialogIsOpen, setUpsertDialogIsOpen] = React.useState(false);

  const deleteProductAction = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Paciente deletado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar product.");
    },
  });

  const handleDeleteProductClick = () => {
    if (!product) return;
    deleteProductAction.execute({ id: product.id });
  };

  const handleEditProductClick = () => {
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
          <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
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
                  Tem certeza que deseja deletar esse product?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser revertida. Isso irá deletar o product
                  e todas as consultas agendadas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProductClick}>
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>

        <UpsertProductForm
          onSuccess={handleEditProductClick}
          product={product}
        />
      </DropdownMenu>
    </Dialog>
  );
};

export default TableActions;
