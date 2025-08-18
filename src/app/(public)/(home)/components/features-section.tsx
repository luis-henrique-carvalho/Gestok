import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Zap, Layers, Palette } from "lucide-react"

const features = [
    {
        icon: Zap,
        title: "Next.js",
        description:
            "Performance e SEO de ponta com a framework React mais amada pelos desenvolvedores. Renderização no servidor (SSR) e geração de sites estáticos (SSG) prontas para usar.",
    },
    {
        icon: Database,
        title: "PostgreSQL",
        description:
            "O banco de dados relacional open-source mais avançado do mundo. Confiabilidade, robustez e escalabilidade para sua aplicação.",
    },
    {
        icon: Layers,
        title: "Drizzle ORM & Prisma",
        description:
            "Escolha o seu ORM preferido ou use ambos. Oferecemos uma integração perfeita para um acesso ao banco de dados totalmente type-safe, com autocomplete e segurança.",
    },
    {
        icon: Palette,
        title: "Shadcn UI",
        description:
            "Componentes de UI elegantes, acessíveis e totalmente personalizáveis. Construa uma interface bonita e moderna sem esforço.",
    },
]

export function FeaturesSection() {
    return (
        <section className="py-16 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Tecnologias de ponta para seu sucesso
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Construído com as melhores ferramentas do ecossistema moderno de desenvolvimento
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
