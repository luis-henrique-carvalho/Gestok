"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import dayjs from "dayjs"

interface ChartData {
    date: string
    entrada: number
    saida: number
}

interface StockMovementsChartProps {
    stockMovements: ChartData[]
}

export function StockMovementsChart({ stockMovements }: StockMovementsChartProps) {
    // Processar dados para o gráfico - formatar datas
    const chartData = React.useMemo(() => {
        return stockMovements.map(item => ({
            ...item,
            date: dayjs(item.date).format("DD/MM")
        }))
    }, [stockMovements])

    const chartConfig = {
        entrada: {
            label: "Entrada",
            color: "var(--primary)",
        },
        saida: {
            label: "Saída",
            color: "var(--destructive)",
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Movimentações de Estoque</CardTitle>
                <CardDescription>
                    Movimentações de entrada e saída por período selecionado
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                            cursor={{
                                fill: "hsl(var(--muted))",
                                opacity: 0.1,
                            }}
                        />
                        <Bar
                            dataKey="entrada"
                            fill="hsl(var(--chart-1))"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="saida"
                            fill="hsl(var(--chart-2))"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
