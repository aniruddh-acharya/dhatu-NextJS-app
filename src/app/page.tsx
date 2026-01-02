"use client";

import { Toaster } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center px-4  py-16">
        <Toaster />

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-12 text-center mx-auto mt-[-20vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to the New Dhatu Uploader
        </h1>
      <p className="text-lg text-gray-700 mb-8">
        Easily upload and your files with our seamless and secure uploader.
      </p>

      <Link href="/upload">
        <Button size="lg" className="px-8 py-8 text-xl font-bold ">
          <Upload className="w-6 h-6" /> Upload Now
        </Button>
      </Link>
      </div>
    </div>
  );
};

export default Home;