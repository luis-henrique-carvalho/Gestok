"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive area chart"


const chartConfig = {
    date: {
        label: "date",
    },
    entrada: {
        label: "Entrada",
        color: "var(--chart-1)",
    },
    saida: {
        label: "Saída",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

interface StockMovementsAreaChartProps {
    stockMovements: {
        date: string,
        entrada: number,
        saida: number
    }[]
}

export function StockMovementsAreaChart({ stockMovements }: StockMovementsAreaChartProps) {

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Movimentações de Estoque</CardTitle>
                    <CardDescription>
                        Mostrando entradas e saídas de produtos
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={stockMovements}>
                        <defs>
                            <linearGradient id="fillEntrada" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--primary)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--primary)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillSaida" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--destructive)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--destructive)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("pt-BR", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value}`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("pt-BR", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="entrada"
                            type="natural"
                            fill="url(#fillEntrada)"
                            stroke="var(--primary)"
                        />
                        <Area
                            dataKey="saida"
                            type="natural"
                            fill="url(#fillSaida)"
                            stroke="var(--destructive)"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
