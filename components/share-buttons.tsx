"use client"

import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const fullUrl = `${window.location.origin}${url}`

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
      color: "bg-blue-400 hover:bg-blue-500",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ]

  return (
    <div className="flex gap-2">
      {shareLinks.map((link) => (
        <Button key={link.name} size="sm" className={`text-white ${link.color}`} asChild>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name}
          </a>
        </Button>
      ))}
    </div>
  )
}
