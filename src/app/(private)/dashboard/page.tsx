import React, { Suspense } from "react";
import { requireFullAuth } from "@/lib/auth-utils";
import DashboardContent from "./components/dashboard-content";
import DashboardLoading from "./components/dashboard-loading";

interface DashboardPageProps {
    searchParams: Promise<{
        from?: string;
        to?: string;
    }>;
}

const Dashboard = async ({ searchParams }: DashboardPageProps) => {
    await requireFullAuth();

    const { from, to } = await searchParams;

    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent from={from} to={to} />
        </Suspense>
    );
};

export default Dashboard;
