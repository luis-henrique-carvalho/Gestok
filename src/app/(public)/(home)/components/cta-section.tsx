import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Zap, Shield } from "lucide-react"

export function CTASection() {
    return (
        <section className="relative py-16 sm:py-32 overflow-hidden">
            {/* Background gradient */}
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
                        <span className="text-primary-foreground text-sm font-medium">Mais de 500+ clientes confiam</span>
                    </div>

                    <h2 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl mb-6">
                        Transforme seu controle de estoque
                    </h2>

                    <p className="mx-auto max-w-2xl text-xl text-primary-foreground/90 leading-relaxed">
                        Sistema completo para gerenciar produtos, movimentações e relatórios do seu estoque
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Setup Rápido</h3>
                            <p className="text-primary-foreground/80 text-sm">Configure em menos de 10 minutos</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">100% Seguro</h3>
                            <p className="text-primary-foreground/80 text-sm">Dados protegidos e backup automático</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Star className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Suporte Completo</h3>
                            <p className="text-primary-foreground/80 text-sm">Ajuda sempre que precisar</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-background text-foreground hover:bg-background/90 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            Testar Grátis - 30 dias
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                    </div>
                </div>
            </div>
        </section>
    )
}
