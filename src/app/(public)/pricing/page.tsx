import { getValidSession } from "@/lib/auth-utils";
import { CheckCircle, Star } from "lucide-react";

import { SubscriptionPlan } from "@/app/(shared)/components/subscription-plan";

export default async function Home() {
    const session = await getValidSession();

    const plans = [
        {
            name: "Starter",
            price: "R$29",
            description: "Perfeito para profissionais autônomos",
            features: [
                "Até 2 médicos",
                "100 agendamentos/mês",
                "Métricas básicas",
                "Suporte por email",
                "Cadastro de products"
            ],
            popular: false,
            iconName: "star"
        },
        {
            name: "Professional",
            price: "R$59",
            description: "Ideal para pequenas clínicas",
            features: [
                "Até 5 médicos",
                "Agendamentos ilimitados",
                "Métricas avançadas",
                "Suporte prioritário",
                "Relatórios personalizados",
                "Integração com WhatsApp"
            ],
            popular: false,
            iconName: "crown"
        },
        {
            name: "Enterprise",
            price: "R$99",
            description: "Para grandes clínicas e hospitais",
            features: [
                "Médicos ilimitados",
                "Agendamentos ilimitados",
                "Métricas completas",
                "Suporte 24/7",
                "API personalizada",
                "Treinamento da equipe",
                "Integrações avançadas"
            ],
            popular: false,
            iconName: "building2"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
            {/* Header Section */}
            <div className="relative py-16 sm:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-primary" />

                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <Star className="h-4 w-4 text-yellow-300" />
                            <span className="text-primary-foreground text-sm font-medium">Mais de 2.000 profissionais confiam</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl mb-6">
                            Escolha o plano ideal para você
                        </h1>

                        <p className="mx-auto max-w-2xl text-xl text-primary-foreground/90 leading-relaxed">
                            Planos flexíveis que crescem junto com sua clínica.
                            Comece pequeno e escale conforme necessário.
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <SubscriptionPlan
                                key={plan.name}
                                userEmail={session?.user?.email ?? ""}
                                planName={plan.name}
                                planPrice={plan.price}
                                planDescription={plan.description}
                                planFeatures={plan.features}
                                isPopular={plan.popular}
                                iconName={plan.iconName}
                                isActive={false}
                            />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2 mb-4">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium text-foreground">Garantia de 30 dias ou seu dinheiro de volta</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                            Junte-se a mais de 2.000 profissionais de saúde que já transformaram
                            sua rotina com nossa solução. Economize 15 horas por semana em tarefas administrativas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
