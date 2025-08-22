import dayjs from "dayjs";
import React from "react";

import {
    PageActions,
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/layout/page-container";

import { DatePicker } from "./date-picker";
import StatsCards from "./status-card";
import { StockMovementsTable } from "./stock-movements-table";
import { getDashboard } from "../actions";
import { StockMovementsAreaChart } from "./stock-movements-area-chart";

interface DashboardContentProps {
    from?: string;
    to?: string;
}

const DashboardContent = async ({ from, to }: DashboardContentProps) => {
    const fromDate = from || dayjs().subtract(6, "month").format("YYYY-MM-DD");
    const toDate = to || dayjs().format("YYYY-MM-DD");

    const dashboardDataResult = await getDashboard({ from: fromDate, to: toDate });

    if (dashboardDataResult.serverError) {
        throw new Error(dashboardDataResult.serverError);
    }

    const data = dashboardDataResult.data;

    if (!data) {
        return <div>Não foi possível carregar os dados do dashboard</div>;
    }

    const {
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        stockQuantity,
        latestStockMovements,
        monthStockMovements
    } = data;

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Dashboard</PageTitle>
                    <PageDescription>Tenha a visão geral do seu negócio</PageDescription>
                </PageHeaderContent>

                <PageActions>
                    <DatePicker />
                </PageActions>
            </PageHeader>

            <PageContent>
                <StatsCards
                    totalProducts={totalProducts ?? 0}
                    lowStockProducts={lowStockProducts ?? 0}
                    outOfStockProducts={outOfStockProducts ?? 0}
                    stockQuantity={stockQuantity ?? 0}
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2.25fr_1fr]">
                    <StockMovementsAreaChart stockMovements={monthStockMovements ?? []} />
                    <StockMovementsTable stockMovements={latestStockMovements ?? []} />
                </div>

            </PageContent>
        </PageContainer>
    );
};

export default DashboardContent;
