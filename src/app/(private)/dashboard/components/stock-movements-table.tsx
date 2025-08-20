"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dayjs from "dayjs"

interface StockMovement {
    id: number
    quantity: number
    movementType: "in" | "out"
    movementReason: "supplier_purchase" | "customer_sale" | "stock_replenishment"
    createdAt: Date
    product: {
        id: number
        name: string
        sku: string
    }
}

interface StockMovementsTableProps {
    stockMovements: StockMovement[]
}

const getMovementReasonLabel = (reason: string) => {
    switch (reason) {
        case "supplier_purchase":
            return "Compra do Fornecedor"
        case "customer_sale":
            return "Venda ao Cliente"
        case "stock_replenishment":
            return "Reposição de Estoque"
        default:
            return reason
    }
}

const getMovementTypeLabel = (type: "in" | "out") => {
    return type === "in" ? "Entrada" : "Saída"
}

const getMovementTypeVariant = (type: "in" | "out") => {
    return type === "in" ? "default" : "destructive"
}

export function StockMovementsTable({ stockMovements }: StockMovementsTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Últimos Movimentos</CardTitle>
                <CardDescription>
                    Movimentações de estoque mais recentes
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stockMovements.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    Nenhum movimento encontrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            stockMovements.map((movement) => (
                                <TableRow key={movement.id}>
                                    <TableCell className="font-medium">
                                        {movement.product.name}
                                    </TableCell>

                                    <TableCell>
                                        <Badge variant={getMovementTypeVariant(movement.movementType)}>
                                            {getMovementTypeLabel(movement.movementType)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono">
                                        {movement.quantity}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
