"use client";
import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

import { t as getBlogDict } from "@/app/i18n/blog";

export default function SocialShare({ title, isAr, lang }) {
  const [shareUrl, setShareUrl] = useState("");
  const dict = getBlogDict(lang);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const shareIcons = [
    { 
      Icon: FaFacebookF, 
      color: "hover:bg-blue-600", 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    { 
      Icon: FaTwitter, 
      color: "hover:bg-black", 
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`
    },
    { 
      Icon: FaLinkedinIn, 
      color: "hover:bg-blue-700", 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    { 
      Icon: FaWhatsapp, 
      color: "hover:bg-green-500", 
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`
    }
  ];

  return (
    <div className={`flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
      <span className="text-xs font-black uppercase text-slate-400 tracking-widest">
        {dict.sharingLabel}
      </span>
      <div className="flex gap-2">
        {shareIcons.map(({ Icon, color, url }, i) => (
          <a 
            key={i} 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary ${color} hover:text-white transition-all shadow-sm`}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}
