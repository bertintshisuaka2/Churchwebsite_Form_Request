import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-yellow-400 text-black hover:bg-yellow-500 border-yellow-500"
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold">{language === 'en' ? 'FR' : 'EN'}</span>
    </Button>
  );
}

