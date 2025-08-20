import { LoginForm } from "@/app/(public)/(auth)/components/login-form";
import { requirePublicAuth } from "@/lib/auth-utils";

export default async function LoginPage() {
    await requirePublicAuth();

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <LoginForm />
            </div>
        </div>
    );
}
