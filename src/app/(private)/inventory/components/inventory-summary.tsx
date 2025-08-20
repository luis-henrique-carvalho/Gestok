"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

interface InventorySummaryProps {
    totalProducts: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    normalStockProducts: number;
}

export function InventorySummary({
    totalProducts,
    lowStockProducts,
    outOfStockProducts,
    normalStockProducts,
}: InventorySummaryProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalProducts}</div>
                    <p className="text-xs text-muted-foreground">
                        Produtos cadastrados
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Estoque Normal</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{normalStockProducts}</div>
                    <p className="text-xs text-muted-foreground">
                        Produtos com estoque adequado
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{lowStockProducts}</div>
                    <p className="text-xs text-muted-foreground">
                        Produtos com estoque baixo
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sem Estoque</CardTitle>
                    <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
                    <p className="text-xs text-muted-foreground">
                        Produtos sem estoque
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
