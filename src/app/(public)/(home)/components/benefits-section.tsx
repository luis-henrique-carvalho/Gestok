import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Shield, Sparkles, Rocket } from "lucide-react"

const benefits = [
    {
        icon: Clock,
        title: "Economize semanas de trabalho",
        description:
            "Esqueça a configuração inicial. O template já vem com autenticação, gerenciamento de usuários e estrutura de banco de dados.",
    },
    {
        icon: Shield,
        title: "Totalmente Type-Safe",
        description: "Da API ao banco de dados, garanta a segurança e a manutenibilidade do seu código com TypeScript.",
    },
    {
        icon: Sparkles,
        title: "Design Profissional",
        description: "Com Shadcn UI, sua aplicação já nasce com uma aparência moderna e profissional.",
    },
    {
        icon: Rocket,
        title: "Pronto para Produção",
        description: "Estrutura otimizada para deployment em plataformas como Vercel e AWS.",
    },
]

export function BenefitsSection() {
    return (
        <section className="bg-gradient-to-br from-muted/30 to-background py-16 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Por que escolher nosso template?
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Benefícios que aceleram seu desenvolvimento e garantem qualidade
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {benefits.map((benefit) => (
                        <Card
                            key={benefit.title}
                            className="group relative overflow-hidden border-0 bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <CardHeader className="pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                                        <benefit.icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="font-heading text-xl font-semibold">{benefit.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-7">{benefit.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
