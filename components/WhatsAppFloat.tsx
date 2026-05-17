'use client'

import { useEffect } from 'react'

export default function WhatsAppFloat() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      gsap.to('.whatsapp-float', {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      })
    }
    loadGSAP()
  }, [])

  return (
    <a href="https://wa.me/94771234567" className="whatsapp-float" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.4-1.3-3.4-2.9-.3-.5.3-.4.7-1.4.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 2-1.3.3-.7.3-1.2.2-1.3-.1-.2-.3-.3-.6-.4z"/>
        <path d="M20.5 3.5A11.45 11.45 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.1-1.6c1.7.9 3.6 1.4 5.6 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.6 1 1-3.5-.2-.4c-1-1.5-1.5-3.3-1.5-5.2 0-5.4 4.4-9.7 9.7-9.7 2.6 0 5 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.3-4.4 9.6-9.8 9.6z"/>
      </svg>
    </a>
  )
}
