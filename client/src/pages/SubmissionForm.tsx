import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { Church, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function SubmissionForm() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [ministries, setMinistries] = useState<string[]>([]);
  const [desiredFeatures, setDesiredFeatures] = useState<string[]>([]);
  const [hasExistingWebsite, setHasExistingWebsite] = useState(false);

  const createSubmission = trpc.submissions.create.useMutation({
    onSuccess: () => {
      setLocation("/success");
    },
    onError: (error) => {
      toast.error("Failed to submit form: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createSubmission.mutate({
      // Church Basic Information
      churchName: formData.get("churchName") as string,
      denomination: formData.get("denomination") as string || undefined,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string || undefined,
      zipCode: formData.get("zipCode") as string || undefined,
      country: formData.get("country") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string || undefined,

      // Contact Person
      contactName: formData.get("contactName") as string,
      contactTitle: formData.get("contactTitle") as string || undefined,
      contactPhone: formData.get("contactPhone") as string,
      contactEmail: formData.get("contactEmail") as string,

      // Church Details
      missionStatement: formData.get("missionStatement") as string || undefined,
      visionStatement: formData.get("visionStatement") as string || undefined,
      statementOfFaith: formData.get("statementOfFaith") as string || undefined,
      churchHistory: formData.get("churchHistory") as string || undefined,

      // Service Information
      serviceTimes: formData.get("serviceTimes") as string || undefined,

      // Ministries and Features
      ministries: ministries.length > 0 ? ministries : undefined,
      desiredFeatures: desiredFeatures.length > 0 ? desiredFeatures : undefined,

      // Website Requirements
      hasExistingWebsite,
      existingWebsiteUrl: formData.get("existingWebsiteUrl") as string || undefined,
      preferredColors: formData.get("preferredColors") as string || undefined,
      additionalNotes: formData.get("additionalNotes") as string || undefined,

      // Budget and Timeline
      budget: formData.get("budget") as string || undefined,
      timeline: formData.get("timeline") as string || undefined,
    });
  };

  const ministryOptions = [
    "Children's Ministry",
    "Youth Ministry",
    "Worship Ministry",
    "Small Groups",
    "Outreach/Missions",
    "Prayer Ministry",
    "Women's Ministry",
    "Men's Ministry",
    "Senior Ministry",
  ];

  const featureOptions = [
    "Online Giving",
    "Sermon Archive",
    "Event Calendar",
    "Blog",
    "Prayer Requests",
    "Small Group Directory",
    "Live Streaming",
    "Newsletter Signup",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-black shadow-lg sticky top-0 z-10">
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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('formTitle')}</h2>
            <p className="text-gray-600">
              {t('formDescription')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Church Basic Information */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">{t('churchInformation')}</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="churchName">{t('churchNameLabel')} *</Label>
                  <Input id="churchName" name="churchName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="denomination">{t('denomination')}</Label>
                  <Input id="denomination" name="denomination" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t('streetAddress')} *</Label>
                <Input id="address" name="address" required />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('city')} *</Label>
                  <Input id="city" name="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t('stateProvince')}</Label>
                  <Input id="state" name="state" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">{t('zipCode')}</Label>
                  <Input id="zipCode" name="zipCode" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">{t('country')} *</Label>
                  <Input id="country" name="country" required defaultValue="United States" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')} *</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')} *</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">{t('website')}</Label>
                <Input id="website" name="website" type="url" placeholder="https://" />
              </div>
            </section>

            {/* Contact Person */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">{t('contactPerson')}</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">{t('contactName')} *</Label>
                  <Input id="contactName" name="contactName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">{t('contactTitle')}</Label>
                  <Input id="contactTitle" name="contactTitle" placeholder="e.g., Pastor, Administrator" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">{t('contactPhone')} *</Label>
                  <Input id="contactPhone" name="contactPhone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">{t('contactEmail')} *</Label>
                  <Input id="contactEmail" name="contactEmail" type="email" required />
                </div>
              </div>
            </section>

            {/* Church Details */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">{t('churchDetails')}</h3>
              
              <div className="space-y-2">
                <Label htmlFor="missionStatement">{t('missionStatement')}</Label>
                <Textarea id="missionStatement" name="missionStatement" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visionStatement">{t('visionStatement')}</Label>
                <Textarea id="visionStatement" name="visionStatement" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statementOfFaith">{t('statementOfFaith')}</Label>
                <Textarea id="statementOfFaith" name="statementOfFaith" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="churchHistory">{t('churchHistory')}</Label>
                <Textarea id="churchHistory" name="churchHistory" rows={4} placeholder="Tell us about your church's founding and journey..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceTimes">{t('serviceTimes')}</Label>
                <Textarea id="serviceTimes" name="serviceTimes" rows={2} placeholder="e.g., Sunday 9:00 AM & 11:00 AM, Wednesday 7:00 PM" />
              </div>
            </section>

            {/* Ministries */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">{t('ministries')}</h3>
              <p className="text-sm text-gray-600">{t('ministriesDesc')}</p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {ministryOptions.map((ministry) => (
                  <div key={ministry} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ministry-${ministry}`}
                      checked={ministries.includes(ministry)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setMinistries([...ministries, ministry]);
                        } else {
                          setMinistries(ministries.filter((m) => m !== ministry));
                        }
                      }}
                    />
                    <Label htmlFor={`ministry-${ministry}`} className="font-normal cursor-pointer">
                      {ministry}
                    </Label>
                  </div>
                ))}
              </div>
            </section>

            {/* Website Requirements */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">{t('websiteRequirements')}</h3>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasExistingWebsite"
                  checked={hasExistingWebsite}
                  onCheckedChange={(checked) => setHasExistingWebsite(checked as boolean)}
                />
                <Label htmlFor="hasExistingWebsite" className="font-normal cursor-pointer">
                  {t('hasExistingWebsite')}
                </Label>
              </div>

              {hasExistingWebsite && (
                <div className="space-y-2">
                  <Label htmlFor="existingWebsiteUrl">{t('existingWebsiteUrl')}</Label>
                  <Input id="existingWebsiteUrl" name="existingWebsiteUrl" type="url" placeholder="https://" />
                </div>
              )}

              <div className="space-y-2">
                <Label>{t('desiredFeatures')}</Label>
                <p className="text-sm text-gray-600 mb-2">{t('desiredFeaturesDesc')}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {featureOptions.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={desiredFeatures.includes(feature)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDesiredFeatures([...desiredFeatures, feature]);
                          } else {
                            setDesiredFeatures(desiredFeatures.filter((f) => f !== feature));
                          }
                        }}
                      />
                      <Label htmlFor={`feature-${feature}`} className="font-normal cursor-pointer">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredColors">{t('preferredColors')}</Label>
                <Input id="preferredColors" name="preferredColors" placeholder="e.g., Blue and white, warm earth tones" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">{t('additionalNotes')}</Label>
                <Textarea id="additionalNotes" name="additionalNotes" rows={4} />
              </div>
            </section>

            {/* Budget and Timeline */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">{t('budgetTimeline')}</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">{t('budget')}</Label>
                  <Input id="budget" name="budget" placeholder="e.g., $2,000 - $5,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">{t('timeline')}</Label>
                  <Input id="timeline" name="timeline" placeholder="e.g., 2-3 months" />
                </div>
              </div>
            </section>

            <div className="pt-6 border-t">
              <Button type="submit" size="lg" className="w-full" disabled={createSubmission.isPending}>
                {createSubmission.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('submitRequest')}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

