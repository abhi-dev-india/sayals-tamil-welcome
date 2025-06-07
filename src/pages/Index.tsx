
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Inline KolamPattern component
const KolamPattern = ({ className = "", size = "w-16 h-16" }: { className?: string; size?: string }) => {
  return (
    <div className={`${size} ${className} kolam-pattern`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <pattern id="kolamDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
          </pattern>
        </defs>
        
        <rect width="100" height="100" fill="url(#kolamDots)" opacity="0.3"/>
        
        <g transform="translate(50,50)" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle})`}>
              <path d="M 0,-20 Q -8,-12 0,-8 Q 8,-12 0,-20" fill="currentColor" opacity="0.6"/>
            </g>
          ))}
          
          <circle r="8" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.4"/>
          <circle r="3" fill="currentColor"/>
        </g>
        
        <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6">
          <path d="M 15,15 Q 25,5 35,15 Q 25,25 15,15"/>
          <path d="M 85,15 Q 75,5 65,15 Q 75,25 85,15"/>
          <path d="M 15,85 Q 25,95 35,85 Q 25,75 15,85"/>
          <path d="M 85,85 Q 75,95 65,85 Q 75,75 85,85"/>
        </g>
      </svg>
    </div>
  );
};

// Inline TamilTooltip component
const TamilTooltip = ({ tamilWord, translation, children }: { tamilWord: string; translation: string; children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-turmeric">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-coffee text-white border-coffee">
          <p><strong>{tamilWord}</strong> - {translation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Inline ComfortFoodSelector component
const ComfortFoodSelector = ({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) => {
  const comfortFoods = [
    {
      value: "sambar-sadham",
      label: "Sambar Sadham",
      description: "Rice with lentil stew",
      emoji: "🍚"
    },
    {
      value: "chicken-chettinad",
      label: "Chicken Chettinad",
      description: "Spicy chicken curry from Chettinad region",
      emoji: "🍛"
    },
    {
      value: "curd-rice",
      label: "Curd Rice",
      description: "Yogurt mixed rice",
      emoji: "🥛"
    },
    {
      value: "rasam",
      label: "Rasam",
      description: "Pepper-tamarind soup",
      emoji: "🍲"
    },
    {
      value: "dosa",
      label: "Dosa",
      description: "Crispy rice crepe",
      emoji: "🥞"
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-2">
        <label className="text-sm font-medium text-coffee flex items-center gap-2">
          Pick your comfort food:
          <Tooltip>
            <TooltipTrigger>
              <span className="text-turmeric cursor-help">ℹ️</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose your favorite Tamil dish to help us personalize your experience</p>
            </TooltipContent>
          </Tooltip>
        </label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="bg-white/80 border-banana-leaf/30 focus:border-banana-leaf hover:bg-white transition-all duration-200">
            <SelectValue placeholder="Select your favorite dish..." />
          </SelectTrigger>
          <SelectContent className="bg-white border-banana-leaf/30">
            {comfortFoods.map((food) => (
              <SelectItem 
                key={food.value} 
                value={food.value}
                className="hover:bg-banana-leaf-light/20 focus:bg-banana-leaf-light/20 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{food.emoji}</span>
                  <div>
                    <div className="font-medium text-coffee">{food.label}</div>
                    <div className="text-xs text-muted-foreground">{food.description}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </TooltipProvider>
  );
};

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    postcode: '',
    comfortFood: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.street || !formData.city || !formData.postcode) {
      toast({
        title: "Please fill in all required fields",
        description: "We need your complete details to deliver authentic Tamil meals to your doorstep.",
        variant: "destructive"
      });
      return;
    }

    // UK phone number validation (basic)
    const ukPhoneRegex = /^(\+44|0)[0-9]{10,11}$/;
    if (!ukPhoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid UK phone number.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Vanakkam! Welcome to Sayal's Kitchen! 🎉",
      description: "Your account has been created. Get ready to taste authentic Tamil Nadu flavours!",
    });

    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-banana-leaf-light via-turmeric-light to-sunset-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <KolamPattern className="text-banana-leaf" size="w-24 h-24" />
        </div>
        <div className="absolute top-20 right-20">
          <KolamPattern className="text-coffee" size="w-16 h-16" />
        </div>
        <div className="absolute bottom-20 left-20">
          <KolamPattern className="text-sunset" size="w-20 h-20" />
        </div>
        <div className="absolute bottom-10 right-10">
          <KolamPattern className="text-turmeric" size="w-18 h-18" />
        </div>
      </div>

      {/* Floating food icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-16 floating-element text-4xl">🥥</div>
        <div className="absolute top-1/3 right-24 floating-element text-3xl animation-delay-1000">☕</div>
        <div className="absolute bottom-1/4 left-24 floating-element text-3xl animation-delay-2000">🍃</div>
        <div className="absolute bottom-1/3 right-16 floating-element text-4xl animation-delay-3000">🌶️</div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <KolamPattern className="text-banana-leaf gentle-pulse" size="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-banana-leaf to-coffee bg-clip-text text-transparent">
              Sayal's Kitchen
            </h1>
            <KolamPattern className="text-sunset gentle-pulse" size="w-12 h-12" />
          </div>
          
          <p className="text-xl md:text-2xl text-coffee mb-2">
            <TamilTooltip tamilWord="Vanakkam" translation="Hello/Welcome in Tamil">
              Vanakkam
            </TamilTooltip>{" "}
            (Hello)! Start your journey with Sayal's Kitchen 🍽️
          </p>
          
          <p className="text-lg text-coffee/80">
            Authentic Tamil Nadu home-style meals delivered fresh to your UK doorstep
          </p>
        </div>

        {/* Main signup form */}
        <div className="max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-banana-leaf/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-coffee flex items-center justify-center gap-2">
                Join Our Family
                <span className="text-sunset">🏠</span>
              </CardTitle>
              <p className="text-coffee/70 text-sm">
                Experience the taste of home, thousands of miles away
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="text-sm font-medium text-coffee">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="e.g., Aravind Ramasamy"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="bg-white/80 border-banana-leaf/30 focus:border-banana-leaf"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-coffee">
                    Phone Number (UK format)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g., +44 7123 456789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/80 border-banana-leaf/30 focus:border-banana-leaf"
                    required
                  />
                </div>

                <Separator className="bg-banana-leaf/20" />

                {/* Address Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-coffee flex items-center gap-2">
                    Delivery Address 📍
                  </h3>
                  
                  <div>
                    <label htmlFor="street" className="text-sm font-medium text-coffee">
                      Street Address
                    </label>
                    <Input
                      id="street"
                      type="text"
                      placeholder="e.g., 123 High Street"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className="bg-white/80 border-banana-leaf/30 focus:border-banana-leaf"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="text-sm font-medium text-coffee">
                      City
                    </label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="e.g., London"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-white/80 border-banana-leaf/30 focus:border-banana-leaf"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="postcode" className="text-sm font-medium text-coffee">
                      Postcode
                    </label>
                    <Input
                      id="postcode"
                      type="text"
                      placeholder="e.g., SW1A 1AA"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value.toUpperCase())}
                      className="bg-white/80 border-banana-leaf/30 focus:border-banana-leaf"
                      required
                    />
                  </div>
                </div>

                <Separator className="bg-banana-leaf/20" />

                {/* Comfort Food Selection */}
                <ComfortFoodSelector
                  value={formData.comfortFood}
                  onValueChange={(value) => handleInputChange('comfortFood', value)}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-banana-leaf to-coffee hover:from-banana-leaf/90 hover:to-coffee/90 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Sign Up & Taste Tamil Nadu 🌟
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-banana-leaf/20">
            <p className="text-coffee/90 leading-relaxed">
              Sayal's Kitchen brings real Tamil Nadu flavours, freshly cooked in the UK – just like it's made at home.
            </p>
            <div className="flex justify-center items-center gap-4 mt-4 text-2xl">
              <span>🍚</span>
              <span>🥥</span>
              <span>☕</span>
              <span>🌶️</span>
              <span>🍃</span>
            </div>
            <p className="text-sm text-coffee/60 mt-2">
              <TamilTooltip tamilWord="Kolam" translation="Tamil decorative floor art">
                Kolam
              </TamilTooltip>{" "}
              – Traditional Tamil art decorating our page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
