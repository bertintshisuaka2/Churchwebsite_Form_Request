import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import { CheckCircle, Church } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "wouter";

export default function SubmissionSuccess() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-black shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* University of Phoenix Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/university-of-phoenix-logo.png" 
                alt="University of Phoenix" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Center Content */}
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-yellow-400">{t('companyName')}</h1>
            </div>
            
            {/* Georgia Tech Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/georgia-tech-logo.png" 
                alt="Georgia Tech" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
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
            <h2 className="text-4xl font-bold text-gray-900">{t('successTitle')}</h2>
            <p className="text-xl text-gray-600">
              {t('successMessage')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 text-left space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{t('nextSteps')}</h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">1.</span>
                <span>{t('step1')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">2.</span>
                <span>{t('step2')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">3.</span>
                <span>{t('step3')}</span>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/">
              <Button size="lg">{t('backToHome')}</Button>
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

