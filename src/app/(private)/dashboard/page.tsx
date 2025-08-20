import { PageHeaderContent, PageHeader, PageTitle, PageDescription, PageContainer, PageContent } from '@/components/layout/page-container'
import { requireFullAuth } from '@/lib/auth-utils';
import React from 'react'

const Dashboard = async () => {
    await requireFullAuth();

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Dashboard</PageTitle>
                    <PageDescription>Tenha a visão geral do seu negócio</PageDescription>
                </PageHeaderContent>
            </PageHeader>

            <PageContent>
                Conteúdo do Dashboard
            </PageContent>
        </PageContainer>
    )
}

export default Dashboard
