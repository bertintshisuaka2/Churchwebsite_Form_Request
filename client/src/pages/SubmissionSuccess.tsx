import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import { CheckCircle, Church } from "lucide-react";
import { Link } from "wouter";

export default function SubmissionSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <Church className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">{APP_TITLE}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Thank You!</h2>
            <p className="text-xl text-gray-600">
              Your church website request has been successfully submitted.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 text-left space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">What Happens Next?</h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">1.</span>
                <span>Our team will review your submission within 1-2 business days.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">2.</span>
                <span>We'll reach out to discuss your requirements in more detail and provide a quote.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">3.</span>
                <span>Once approved, we'll begin designing your custom church website.</span>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/">
              <Button size="lg">Return to Home</Button>
            </Link>
          </div>

          <div className="text-gray-600">
            <p>If you have any questions, please contact us at the email or phone number provided in your submission.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

