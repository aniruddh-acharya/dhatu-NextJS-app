'use client';
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        signIn("credentials", {
            redirect: false,
            ...credentials,
          })
        .then((res) => {
            if (res?.ok) {
                toast.success("Login successful");
                router.push("/");
            } else {
                setError(res?.status === 401 ? "Invalid Credentials" : "Something went wrong");
                setPending(false);
            }
        })
        .catch(() => {
            setError("Something went wrong");
            setPending(false);
        });
    };

    const handleProviderLogin = (provider: "google") => {
        setPending(true);

        signIn(provider, { callbackUrl: "/" })
        .catch(() => setPending(false));
    };


    return (
        <div className="flex items-center justify-center h-[90vh] px-4 mt-[-80px]">
        <Card className="w-full md:w-[450px] lg:w-[500px] p-6 sm:p-8 shadow-lg">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription className="text-sm text-accent-foreground">
                Access the New Dhatu Uploader
            </CardDescription>
            </CardHeader>
            <CardContent>
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                disabled={pending}
                required
                />
                <Input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                disabled={pending}
                required
                />
                <Button type="submit" className="w-full font-bold" size="lg" disabled={pending}>
                    {pending ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            <Separator className="my-6" />

            <Button
                onClick={() => handleProviderLogin("google")}
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center gap-2 bg-slate-300 hover:bg-slate-400 transition hover:scale-105 font-bold"
                disabled={pending}
                >
                <FcGoogle className="size-6" />
                Login with Google
            </Button>
            </CardContent>
        </Card>     
        </div>
    );
}