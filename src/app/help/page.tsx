"use client";

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">About Dhatu Uploader</h1>
      <p className="text-lg text-gray-700">
        Dhatu Uploader is a powerful tool that allows users to easily upload and manage their files 
        with a seamless and secure experience.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900">Why Choose Dhatu Uploader?</h2>
      <p className="text-lg text-gray-700">
        Our platform is designed with simplicity and efficiency in mind, ensuring that users can 
        quickly upload their files without unnecessary complications.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900">How It Works</h2>
      <p className="text-lg text-gray-700">
        - Simply click on the <strong>Upload</strong> button on the homepage. <br />
        - Select the files you want to upload. <br />
        - Our system will securely store and manage your uploads.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
      <p className="text-lg text-gray-700">
        For further assistance, reach out to us at <br />
        <a href="mailto:contact@newdhatu.com" className="text-sky-700 hover:underline">
          contact@newdhatu.com
        </a>
      </p>
    </section>
  );
}
