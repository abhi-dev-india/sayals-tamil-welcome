
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

export default ComfortFoodSelector;
