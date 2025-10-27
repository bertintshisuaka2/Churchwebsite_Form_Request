import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import { Church, FileText, Users, Palette } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Church className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">{APP_TITLE}</h1>
          </div>
          <Link href="/admin">
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Build Your Church's Digital Presence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let us help you create a beautiful, functional website that serves your congregation and reaches your community.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/submit">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started - Request Your Website
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Process</h3>
              <p className="text-gray-600">
                Simply fill out our comprehensive form with your church's information and requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Palette className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-gray-600">
                We'll create a unique website that reflects your church's mission, vision, and style.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reach More People</h3>
              <p className="text-gray-600">
                Connect with your congregation and welcome new visitors with an engaging online presence.
              </p>
            </div>
          </div>

          {/* What We Include */}
          <div className="pt-16 text-left max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">What's Included</h3>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">Home page with welcoming design and clear navigation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">About page with mission, vision, and church history</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">Service times, location, and visitor information</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">Ministries and programs showcase</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">Events calendar and blog capabilities</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">Contact form and online giving integration</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">Mobile-responsive design for all devices</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2025 {APP_TITLE}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

