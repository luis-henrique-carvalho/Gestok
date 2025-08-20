import {
  PackageIcon,
  AlertTriangleIcon,
  XCircleIcon,
  DollarSignIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  stockQuantity: number;
}

const StatsCards = ({
  totalProducts,
  lowStockProducts,
  outOfStockProducts,
  stockQuantity,
}: StatsCardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const stats = [
    {
      title: "Total de Produtos",
      value: totalProducts,
      subtitle: "Produtos cadastrados",
      icon: PackageIcon,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Estoque",
      value: stockQuantity,
      subtitle: "Quantidade total de produtos em estoque",
      icon: PackageIcon,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Estoque Baixo",
      value: lowStockProducts,
      subtitle: "Produtos com estoque baixo",
      icon: AlertTriangleIcon,
      color: "amber",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      title: "Sem Estoque",
      value: outOfStockProducts,
      subtitle: "Produtos sem estoque",
      icon: XCircleIcon,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "destructive",
      borderColor: "border-red-200",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className={cn(
              "transition-all duration-200 hover:shadow-md",
              stat.borderColor
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </div>
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                stat.bgColor
              )}>
                <Icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
