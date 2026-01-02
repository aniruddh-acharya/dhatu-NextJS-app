'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export default function UploaderPage() {
  const [file, setFile] =  useState<File | null>(null);

  const getEncryptedToken = async () => {
    const res = await fetch("/api/auth/encrypt-token");
    const data = await res.json();
    return data.encryptedToken;
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file ) return;
    try {
      const encryptedToken = await getEncryptedToken();
      const data = new FormData()
      data.set('file', file);
      data.set("token", encryptedToken || "");
      const uploadRoute = process.env.BE_URL as string;
      console.log(uploadRoute)
      const res = await fetch(`https://app.newdhatu.com/upload`, {
        method: 'POST',
        body: data  
      })
      if (!res.ok) {
        throw new Error(await res.text());
      }
      toast.success("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed. Please try again.");
    }
  };

    return (
      <div className="min-h-screen w-screen bg-gray-100 flex items-center px-4  py-16">

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-12 text-center mx-auto mt-[-20vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">File Uploader</h1>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <label className="block w-full cursor-pointer border border-gray-300 rounded-lg p-4 text-gray-600 text-lg bg-gray-50 hover:bg-gray-200 transition">
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {file ? file.name : "Click to select a file"}
        </label>

        <Button type="submit" size="lg" className="w-full text-lg font-bold" disabled={!file}>
          Upload File
        </Button>
      </form>
      </div>
    </div>
  );
}
