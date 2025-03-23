
import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
  variant?: 'icon' | 'button' | 'floating';
}

const SocialShare = ({
  url = window.location.href,
  title = 'Check this out from Team Sportivo',
  className,
  variant = 'icon'
}: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#3b5998] text-white hover:bg-[#3b5998]/90'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0077b5] text-white hover:bg-[#0077b5]/90'
    },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  if (variant === 'floating') {
    return (
      <div className={cn('fixed bottom-6 right-6 z-40', className)}>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-12 w-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300"
            aria-label="Share"
          >
            <Share2 size={20} />
          </button>
          
          <div 
            className={cn(
              "absolute bottom-full right-0 mb-2 flex flex-col gap-2 transition-all duration-300 transform origin-bottom-right",
              isOpen 
                ? "scale-100 opacity-100" 
                : "scale-0 opacity-0 pointer-events-none"
            )}
          >
            {shareLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleShare(link.url)}
                className={cn(
                  "h-10 w-10 rounded-full shadow-md flex items-center justify-center transition-transform duration-300",
                  link.color,
                  `animate-slide-up [animation-delay:${index * 50}ms]`
                )}
                aria-label={`Share on ${link.name}`}
              >
                {link.icon}
              </button>
            ))}
            <button
              onClick={copyToClipboard}
              className="h-10 w-10 rounded-full bg-gray-800 text-white shadow-md flex items-center justify-center hover:bg-gray-700 transition-all animate-slide-up"
              style={{ animationDelay: `${shareLinks.length * 50}ms` }}
              aria-label="Copy link"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'button') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <span className="text-sm font-medium text-gray-700">Share:</span>
        {shareLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => handleShare(link.url)}
            className={cn(
              "h-9 px-3 rounded-md flex items-center gap-2 transition-colors",
              link.color
            )}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            <span className="text-sm">{link.name}</span>
          </button>
        ))}
        <button
          onClick={copyToClipboard}
          className="h-9 px-3 rounded-md bg-gray-800 text-white flex items-center gap-2 hover:bg-gray-700 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span className="text-sm">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    );
  }
  
  // Default icon variant
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      {shareLinks.map((link, index) => (
        <button
          key={index}
          onClick={() => handleShare(link.url)}
          className="h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </button>
      ))}
      <button
        onClick={copyToClipboard}
        className="h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>
    </div>
  );
};

export default SocialShare;
