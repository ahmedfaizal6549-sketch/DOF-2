'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const cols = document.querySelectorAll('.footer-col')
      cols.forEach((col, i) => {
        gsap.fromTo(col as Element,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: i * 0.1,
            scrollTrigger: { trigger: col as Element, start: 'top 90%', once: true }
          }
        )
      })
    }
    loadGSAP()
  }, [])

  const whatsappIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.4-1.3-3.4-2.9-.3-.5.3-.4.7-1.4.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 2-1.3.3-.7.3-1.2.2-1.3-.1-.2-.3-.3-.6-.4z"/>
      <path d="M20.5 3.5A11.45 11.45 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.1-1.6c1.7.9 3.6 1.4 5.6 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.6 1 1-3.5-.2-.4c-1-1.5-1.5-3.3-1.5-5.2 0-5.4 4.4-9.7 9.7-9.7 2.6 0 5 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.3-4.4 9.6-9.8 9.6z"/>
    </svg>
  )

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <span className="nav-brand-logo">
                <img src="/assets/dof-logo-square.png" alt="DOF" />
              </span>
              <span className="footer-brand-text">Dept. of Fragrance</span>
            </div>
            <p className="footer-tagline">100% Authentic · 100% You</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 10-11.6 9.87v-6.98H7.9V12h2.5V9.8c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.22 0-1.6.76-1.6 1.54V12h2.73l-.44 2.89H13.5v6.98A10 10 0 0022 12z"/>
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6 5.82a4.28 4.28 0 01-1.27-3.32H12v13.18a2.59 2.59 0 11-2.59-2.59c.27 0 .53.04.78.12V9.81a5.85 5.85 0 00-.78-.05 5.74 5.74 0 105.74 5.74V9.16a7.42 7.42 0 004.32 1.39V7.32a4.28 4.28 0 01-2.87-1.5z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 7.2s-.22-1.55-.9-2.23c-.86-.9-1.83-.9-2.27-.96C16.7 3.8 12 3.8 12 3.8s-4.7 0-7.83.22c-.44.05-1.4.06-2.27.96C1.22 5.65 1 7.2 1 7.2S.78 9.02.78 10.84v1.7c0 1.82.22 3.64.22 3.64s.22 1.55.9 2.23c.86.9 2 .87 2.5.97 1.81.17 7.6.22 7.6.22s4.7 0 7.83-.23c.44-.05 1.41-.06 2.27-.96.68-.68.9-2.23.9-2.23s.22-1.82.22-3.64v-1.7C23.22 9.02 23 7.2 23 7.2zM9.74 14.36V8.04l6.05 3.18-6.05 3.14z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/category">Category</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about#contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Collections</h4>
            <ul>
              <li><Link href="/shop?cat=men">Men&apos;s</Link></li>
              <li><Link href="/shop?cat=women">Women&apos;s</Link></li>
              <li><Link href="/shop?cat=unisex">Unisex</Link></li>
              <li><Link href="/shop?cat=gifts">Gift Sets</Link></li>
              <li><Link href="/shop?cat=new">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <p>Colombo, Sri Lanka</p>
              <p className="label">Email</p>
              <p>hello@deptoffragrance.lk</p>
              <p className="label">Phone</p>
              <p>+94 77 123 4567</p>
              <a href="https://wa.me/94771234567" className="btn btn-primary footer-whatsapp">
                {whatsappIcon}
                Chat with us
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Department of Fragrance. All rights reserved.</span>
          <span>Made in Sri Lanka 🇱🇰</span>
        </div>
      </div>
    </footer>
  )
}
