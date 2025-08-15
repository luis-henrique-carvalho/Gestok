"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat, PatternFormat } from "react-number-format";
import { toast } from "sonner";

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
import { useQuery } from "@tanstack/react-query";

import { upsertProduct } from "../actions";
import {
  UpsertProductFormData,
  upsertProductSchema,
} from "../schemas/upsert-product-schema";

import { productTable, categoryTable } from "@/drizzle/schema";
import { getCategories } from "@/app/(shared)/actions/categories/get-categories";


interface UpsertProductFormProps {
  onSuccess?: () => void;
  product?: typeof productTable.$inferSelect;
}

const UpsertProductForm = ({ product, onSuccess }: UpsertProductFormProps) => {
  const { data: categories } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getCategories(),
  });


  const form = useForm<UpsertProductFormData>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ? product.price : "0",
      sku: product?.sku || "",
      categoryId: product?.categoryId
        ? product.categoryId.toString()
        : categories?.data?.[0]?.id?.toString() || undefined,
    },
  });

  const upsertProductAction = useAction(upsertProduct, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        if (data.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([field, message]) => {
            form.setError(field as keyof UpsertProductFormData, {
              type: "manual",
              message: message as string,
            });
          });
          return;
        }

        if (data.serverError) {
          toast.error(data.serverError);
          return;
        }

        toast.error("Erro ao salvar produto.");
        return;
      }

      toast.success(
        product
          ? "Produto atualizado com sucesso!"
          : "Produto adicionado com sucesso!"
      );

      onSuccess?.();
    },
  });

  const onSubmit = async (values: UpsertProductFormData) => {
    await upsertProductAction.execute({ ...values, id: product?.id });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {product ? "Editar Produto" : "Adicionar Produto"}
        </DialogTitle>
        <DialogDescription>
          {product
            ? "Edite os detalhes do produto."
            : "Preencha os detalhes do novo produto."}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto pr-2 pb-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o nome do produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite a descrição do produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value.value);
                      }}
                      decimalScale={2}
                      fixedDecimalScale
                      decimalSeparator=","
                      thousandSeparator="."
                      prefix="R$ "
                      allowNegative={false}
                      placeholder="Digite o preço do produto"
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU  do produto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Digite o SKU do produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.data?.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.name}
                        </SelectItem>
                      ))}
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
              disabled={upsertProductAction.status === "executing"}
            >
              {upsertProductAction.status === "executing" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {product ? "Salvar alterações" : "Adicionar produto"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductForm;
