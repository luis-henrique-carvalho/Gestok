"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";


import { upsertStockMovement } from "../actions";
import {
    UpsertStockMovementFormData,
    upsertStockMovementSchema,
} from "../schemas/upsert-stock-movement-schema";
import { stockMovementsTable } from "@/drizzle/schema";
import { getProducts } from "@/app/(private)/products/actions/index";

interface UpsertStockMovementFormProps {
    onSuccess?: () => void;
    stockMovement?: typeof stockMovementsTable.$inferSelect;
    isOpen: boolean;
}

const UpsertStockMovementForm = ({
    stockMovement,
    onSuccess,
    isOpen
}: UpsertStockMovementFormProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["get-products", searchTerm],
        queryFn: async () => await getProducts({
            query: searchTerm,
            limit: 50
        }),
        enabled: isProductSelectOpen,
        staleTime: 1000 * 60 * 5,
    });

    const products = data?.data?.products;

    const defaultValues = {
        id: stockMovement?.id,
        quantity: stockMovement?.quantity || 1,
        movementType: stockMovement?.movementType || "in",
        movementReason: stockMovement?.movementReason || "supplier_purchase",
        productId: stockMovement?.productId || products?.[0]?.id || undefined,
    }

    const form = useForm<UpsertStockMovementFormData>({
        shouldUnregister: true,
        resolver: zodResolver(upsertStockMovementSchema),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (isOpen) {
            form.reset({
                id: stockMovement?.id,
                quantity: stockMovement?.quantity || 1,
                movementType: stockMovement?.movementType || "in",
                movementReason: stockMovement?.movementReason || "supplier_purchase",
                productId: stockMovement?.productId || products?.[0]?.id || undefined,
            });
        }
    }, [isOpen, form, stockMovement]);

    const upsertStockMovementAction = useAction(upsertStockMovement, {
        onSuccess: ({ data }) => {
            if (!data.success) {
                if (data.serverError) {
                    toast.error(data.serverError);
                    return;
                }

                toast.error("Erro ao salvar movimentação de estoque.");
                return;
            }

            toast.success(
                stockMovement
                    ? "Movimentação atualizada com sucesso!"
                    : "Movimentação adicionada com sucesso!"
            );

            onSuccess?.();
        },
    });

    const onSubmit = async (values: UpsertStockMovementFormData) => {
        await upsertStockMovementAction.execute({ ...values, id: stockMovement?.id });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {stockMovement ? "Editar Movimentação" : "Nova Movimentação"}
                </DialogTitle>
                <DialogDescription>
                    {stockMovement
                        ? "Edite os detalhes da movimentação de estoque."
                        : "Registre uma nova movimentação de estoque."}
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto pr-2 pb-4">
                        <FormField
                            control={form.control}
                            name="productId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Produto</FormLabel>
                                    <Popover open={isProductSelectOpen} onOpenChange={setIsProductSelectOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? products?.find((p) => p.id === field.value)?.name ?? "Selecione um produto"
                                                        : "Selecione um produto"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                            <Command shouldFilter={false}>
                                                <CommandInput
                                                    placeholder="Buscar produto..."
                                                    value={searchTerm}
                                                    onValueChange={setSearchTerm}
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    {isLoading ? (
                                                        <div className="flex items-center justify-center py-6">
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                            <span className="ml-2 text-sm text-muted-foreground">
                                                                Carregando produtos...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                                                            <CommandGroup>
                                                                {products?.map((product) => (
                                                                    <CommandItem
                                                                        key={product.id}
                                                                        value={`${product.name} ${product.sku}`}
                                                                        onSelect={() => {
                                                                            field.onChange(product.id);
                                                                            setIsProductSelectOpen(false);
                                                                            setSearchTerm("");
                                                                        }}
                                                                    >
                                                                        {product.name} ({product.sku})
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === product.id
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </>
                                                    )}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantidade</FormLabel>
                                    <FormControl>
                                        <NumericFormat
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(Number(value.value));
                                            }}
                                            allowNegative={false}
                                            placeholder="Digite a quantidade"
                                            customInput={Input}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="movementType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Movimentação</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="in">Entrada</SelectItem>
                                            <SelectItem value="out">Saída</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="movementReason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motivo da Movimentação</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o motivo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="supplier_purchase">
                                                Compra de Fornecedor
                                            </SelectItem>
                                            <SelectItem value="customer_sale">
                                                Venda para Cliente
                                            </SelectItem>
                                            <SelectItem value="stock_replenishment">
                                                Reposição de Estoque
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={upsertStockMovementAction.status === "executing"}
                        >
                            {upsertStockMovementAction.status === "executing" ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {stockMovement ? "Salvar alterações" : "Adicionar movimentação"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default UpsertStockMovementForm;
