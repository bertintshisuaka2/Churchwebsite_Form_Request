import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Church, FileText, Users, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "wouter";

export default function Home() {
  const { t } = useLanguage();
  
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
              <h1 className="text-4xl font-bold text-yellow-400 mb-2">{t('companyName')}</h1>
              <p className="text-yellow-300 text-sm">{t('tagline')}</p>
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
          
          {/* Language Switcher and Admin Login */}
          <div className="flex justify-end items-center gap-3 mt-4">
            <LanguageSwitcher />
            <a href={getLoginUrl("/admin")}>
              <Button variant="outline" size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 border-yellow-400">{t('adminLogin')}</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('heroTitle')}
            </h2>
            <div className="mb-6 p-4 bg-white/80 rounded-lg shadow-sm">
              <p className="text-lg font-semibold text-gray-800 mb-2">{t('bibleVerse')}</p>
              <p className="text-lg italic text-gray-700">
                "{t('bibleText')}"
              </p>
            </div>
            <p className="text-xl text-gray-700 mb-8">
              {t('heroDescription')}
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
                {t('getStarted')}
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
              <h3 className="text-xl font-semibold mb-2">{t('easyProcess')}</h3>
              <p className="text-gray-600">
                {t('easyProcessDesc')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Palette className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('customDesign')}</h3>
              <p className="text-gray-600">
                {t('customDesignDesc')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('reachMore')}</h3>
              <p className="text-gray-600">
                {t('reachMoreDesc')}
              </p>
            </div>
          </div>

          {/* What We Include */}
          <div className="pt-16 text-left max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">{t('whatsIncluded')}</h3>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">{t('feature1')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">{t('feature2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">{t('feature3')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">{t('feature4')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">{t('feature5')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">{t('feature6')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">{t('feature7')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>{t('copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

