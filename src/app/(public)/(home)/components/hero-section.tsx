import { Button } from "@/components/ui/button"
import { ArrowRight, Github, ExternalLink } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 px-6 pt-16 py-16 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
                        <span>🚀 Novo template disponível</span>
                    </div>
                </div>

                <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                    Lance seu próximo projeto{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        SaaS em minutos
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                    Um boilerplate de nível de produção, poderoso e pronto para escalar, construído com as tecnologias mais
                    modernas. Ideal para desenvolvedores que querem focar na lógica de negócios, e não na configuração.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        className="group bg-primary px-8 py-3 text-base font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                    >
                        Comece a construir agora
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="group px-8 py-3 text-base font-semibold hover:bg-accent transition-all duration-200 bg-transparent"
                    >
                        <Github className="mr-2 h-4 w-4" />
                        Acesse no GitHub
                    </Button>
                </div>

                <div className="mt-8">
                    <Button
                        variant="ghost"
                        className="group text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Veja a demo ao vivo
                        <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/10 to-accent/20 opacity-30" />
                </div>
            </div>
        </section>
    )
}
