import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, BarChart3, Settings } from "lucide-react"

const features = [
    {
        icon: Package,
        title: "Controle de Produtos",
        description:
            "Cadastre e gerencie todos os seus produtos com facilidade. Códigos de barras, categorias, preços e informações detalhadas em um só lugar.",
    },
    {
        icon: TrendingUp,
        title: "Movimentações de Estoque",
        description:
            "Acompanhe entradas, saídas e transferências de produtos. Histórico completo de todas as movimentações com data e responsável.",
    },
    {
        icon: BarChart3,
        title: "Relatórios e Analytics",
        description:
            "Visualize o desempenho do seu estoque com relatórios detalhados. Produtos mais vendidos, estoque baixo e análise de tendências.",
    },
    {
        icon: Settings,
        title: "Configurações Avançadas",
        description:
            "Personalize o sistema conforme suas necessidades. Alertas de estoque mínimo, múltiplos usuários e backup automático.",
    },
]

export function FeaturesSection() {
    return (
        <section className="py-16 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Funcionalidades essenciais para seu negócio
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Tudo que você precisa para gerenciar seu estoque de forma eficiente e profissional
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-muted/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="font-heading text-xl font-semibold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm leading-6">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
