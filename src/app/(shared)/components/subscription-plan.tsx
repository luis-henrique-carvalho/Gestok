"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Loader2, Star, Zap, Shield, Users, BarChart3, Mail, Crown, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { createStripeCheckout } from "../actions";

interface SubscriptionPlanProps {
  className?: string;
  userEmail: string;
  planName?: string;
  planPrice?: string;
  planDescription?: string;
  planFeatures?: string[];
  isPopular?: boolean;
  iconName?: string;
  isActive?: boolean;
}

export function SubscriptionPlan({
  className,
  userEmail,
  planName,
  planPrice,
  planDescription,
  planFeatures,
  isPopular,
  iconName,
  isActive,
}: SubscriptionPlanProps) {
  const router = useRouter();

  const iconMap = {
    star: Star,
    crown: Crown,
    building2: Building2,
    zap: Zap,
    shield: Shield,
    users: Users,
    barChart3: BarChart3,
    mail: Mail,
  };

  const PlanIcon = iconMap[iconName as keyof typeof iconMap] || Star;

  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key not found");
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        throw new Error("Stripe not found");
      }

      if (!data?.sessionId) {
        throw new Error("Session ID not found");
      }

      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  });

  const handleSubscribeClick = () => {
    createStripeCheckoutAction.execute();
  };

  const handleManagePlanClick = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
    );
  };

  return (
    <Card className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${isPopular ? 'ring-2 ring-primary' : ''} ${className}`}>
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
          Mais Popular
        </div>
      )}

      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <PlanIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{planName}</h3>
              <p className="text-muted-foreground text-sm">
                {planDescription}
              </p>
            </div>
          </div>
          {isActive && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
              Atual
            </Badge>
          )}
        </div>

        <div className="flex items-baseline mb-2">
          <span className="text-4xl font-bold text-foreground">{planPrice}</span>
          <span className="ml-1 text-muted-foreground">/ mês</span>
        </div>

        <p className="text-sm text-muted-foreground">
          Economize 15 horas por semana em tarefas administrativas
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 border-t border-border pt-6">
          {planFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start group">
              <div className="flex-shrink-0 p-1">
                <CheckCircle2 className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="ml-3">
                <p className="text-foreground font-medium">{feature}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <Button
            className={`w-full py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${isPopular
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
              }`}
            onClick={isActive ? handleManagePlanClick : handleSubscribeClick}
            disabled={createStripeCheckoutAction.isExecuting}
          >
            {createStripeCheckoutAction.isExecuting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isActive ? (
              "Gerenciar assinatura"
            ) : (
              "Começar agora"
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Cancelamento gratuito a qualquer momento
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
