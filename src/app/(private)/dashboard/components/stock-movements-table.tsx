"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
                                        <span className={movement.movementType === "out" ? "text-red-600" : "text-green-600"}>
                                            {movement.movementType === "out" ? "-" : "+"}{movement.quantity} un
                                        </span>
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
