import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { redirect } from "next/navigation";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { requireFullAuth } from "@/lib/auth-utils";

import { DatePicker } from "./components/date-picker";
import StatsCards from "./components/status-card";
import { getDashboard } from "./actions";

interface DashboardPageProps {
    searchParams: Promise<{
        from: string;
        to: string;
    }>;
}

const Dashboard = async ({ searchParams }: DashboardPageProps) => {
    await requireFullAuth();

    const { from, to } = await searchParams;

    if (!from || !to) {
        redirect(
            `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
        );
    }

    const dashboardDataResult = await getDashboard({ from, to });

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
        latestStockMovements
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
            </PageContent>
        </PageContainer>
    );
};

export default Dashboard;
