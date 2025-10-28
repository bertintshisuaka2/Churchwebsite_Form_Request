import { Button } from "@/components/ui/button";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Church, FileText, Users, Palette } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      {/* Header */}
      <header className="bg-black shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-8">
            {/* University of Phoenix Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/university-of-phoenix-logo.png" 
                alt="University of Phoenix" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            {/* Center Content with Promo Photo */}
            <div className="flex-1 flex flex-col items-center">
              {/* Promo Photo */}
              <div className="mb-3">
                <img 
                  src="/promo-photo.png" 
                  alt="Promotional" 
                  className="h-24 w-24 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                />
              </div>
              <h1 className="text-4xl font-bold text-yellow-400 mb-2">Divalaser Software Solutions</h1>
              <p className="text-yellow-300 text-sm">Building Excellence in Digital Solutions</p>
            </div>
            
            {/* Georgia Tech Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/georgia-tech-logo.png" 
                alt="Georgia Tech" 
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Admin Login Button */}
          <div className="flex justify-end mt-4">
            <a href={getLoginUrl("/admin")}>
              <Button variant="outline" size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 border-yellow-400">Admin Login</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Build Your Church's Digital Presence
            </h2>
            <div className="mb-6 p-4 bg-white/80 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-800 mb-2">Matthew 24:14 (NKJV)</p>
              <p className="text-lg italic text-gray-700">
                "And this gospel of the kingdom will be preached in all the world as a witness to all the nations, and then the end will come."
              </p>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              Let us help you create a beautiful, functional website that serves your congregation and reaches the ends of the earth.
            </p>
          </div>

          {/* Team Photo */}
          <div className="pt-8">
            <img 
              src="/team-photo.jpg" 
              alt="Divalaser Software Solutions Team" 
              className="rounded-lg shadow-xl mx-auto max-w-2xl w-full object-cover"
            />
          </div>

          <div className="pt-8">
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
          <p>&copy; 2025 Divalaser Software Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

