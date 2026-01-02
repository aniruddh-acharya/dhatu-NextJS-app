'use client';
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
      });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        .then((res) => res.json().then((data) => ({ status: res.status, data })))
        .then(({ status, data }) => {
            if (status === 200) {
            toast.success(data.message);
            router.push("/login");
            } else {
            setError(data.message);
            setPending(false);
            }
        })
        .catch(() => {
            setError("Something went wrong.");
            setPending(false);
        });
    };

    return (
        <div className="flex items-center justify-center h-[90vh] px-4 mt-[-40px]">
        <Card className="w-full md:w-[450px] lg:w-[500px] p-6 sm:p-8 shadow-lg">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
            <CardDescription className="text-sm text-accent-foreground">
                Create an account to access the New Dhatu Uploader
            </CardDescription>
            </CardHeader>

            {error && (
            <div className="bg-red-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-700 mb-4">
                <TriangleAlert className="size-5" />
                <p>{error}</p>
            </div>
            )}
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                disabled={pending}
                required
                />
                <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                disabled={pending}
                required
                />
                <Input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={form.phone_number}
                onChange={handleChange}
                disabled={pending}
                required
                />
                <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                disabled={pending}
                required
                />
                <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={pending}
                required
                />
                <Button type="submit" className="w-full font-bold" size="lg" disabled={pending}>
                {pending ? "Creating Account..." : "Sign Up"}
                </Button>
            </form>
            
            <Separator className="my-6" />
            <Button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center gap-2 bg-slate-300 hover:bg-slate-400 transition hover:scale-105 font-bold"
                disabled={pending}
            >
                <FcGoogle className="size-6" />
                Sign Up with Google
            </Button>

            <p className="text-center text-sm mt-4 text-muted-foreground font-bold">
                Already have an account?{" "}
                <Link href="/login" className="text-sky-700 hover:underline">
                Login Here
                </Link>
            </p>
            </CardContent>
        </Card>
        </div>
    );
}