
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TamilTooltipProps {
  tamilWord: string;
  translation: string;
  children: React.ReactNode;
}

const TamilTooltip = ({ tamilWord, translation, children }: TamilTooltipProps) => {
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

export default TamilTooltip;
