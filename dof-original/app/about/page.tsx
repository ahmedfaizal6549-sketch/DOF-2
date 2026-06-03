'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AboutPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Hero text entrance
      gsap.fromTo('.about-hero h1',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      )

      // Timeline steps sequential entrance
      gsap.utils.toArray('.timeline-step').forEach((step, i) => {
        gsap.fromTo(step as Element,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: i * 0.15,
            scrollTrigger: { trigger: step as Element, start: 'top 85%', once: true }
          }
        )
      })

      // Philosophy blocks stagger
      ScrollTrigger.batch('.philosophy-block', {
        onEnter: batch => gsap.fromTo(batch,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' }
        ),
        once: true
      })

      // Scroll reveal
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add('in'), i * 60)
              io.unobserve(entry.target)
            }
          })
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
        document.querySelectorAll('.reveal').forEach(el => io.observe(el))
      } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'))
      }
    }
    loadGSAP()
  }, [])

  const whatsappSVG = (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.4-1.3-3.4-2.9-.3-.5.3-.4.7-1.4.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 2-1.3.3-.7.3-1.2.2-1.3-.1-.2-.3-.3-.6-.4z"/>
      <path d="M20.5 3.5A11.45 11.45 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.1-1.6c1.7.9 3.6 1.4 5.6 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.4-8.3z"/>
    </svg>
  )

  return (
    <main style={{ paddingTop: 0 }}>

      {/* HERO */}
      <section className="about-hero" style={{ padding: 0 }}>
        <img
          className="bg"
          src="https://images.unsplash.com/photo-1592945403407-9caf930b7f93?w=2000&auto=format&fit=crop&q=80"
          alt=""
        />
        <div className="content">
          <span className="eyebrow centered" style={{ color: 'var(--accent)' }}>Department of Fragrance</span>
          <h1>Our Story</h1>
          <div className="line"></div>
          <p className="tag">100% Authentic · 100% You</p>
        </div>
        <a href="#story" className="scroll-indicator" aria-label="Scroll">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="24" height="24">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </a>
      </section>

      {/* BRAND STORY */}
      <section id="story">
        <div className="container">
          <div className="story-grid">
            <div className="reveal">
              <blockquote className="pull-quote">
                &ldquo;The wrong fragrance is wallpaper. The right one is a memory you wear.&rdquo;
              </blockquote>
            </div>
            <div className="story-body reveal">
              <p>Dept. of Fragrance began in 2022 in Colombo with a single, stubborn question: why was authentic designer fragrance triple the price in Sri Lanka compared to the rest of the world — and why was nobody talking about it?</p>
              <p>The answer, as it turned out, was a chain of middlemen, currency markups, and shelves of grey-market product nobody could verify. We bypassed all of it. Today we work directly with authorised distributors of Lattafa, Afnan, Rasasi, Armaf, French Avenue, Rayhaan and Riffs in the UAE, importing under our own license and selling at sub-retail.</p>
              <p>Every bottle that leaves us carries a batch code you can verify against the manufacturer. If it doesn&apos;t match, you don&apos;t pay. That&apos;s not a marketing line — it&apos;s the only way this business works.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy">
        <div className="container">
          <h2 className="section-head reveal">The DOF Philosophy</h2>
          <div className="philosophy-grid">
            <div className="philosophy-block">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c-3 3-3 7 0 10 3-3 3-7 0-10z"/>
                  <path d="M12 12v10M6 22h12"/>
                </svg>
              </div>
              <h3>Authenticity First</h3>
              <p>Direct-import. Authorised channel only. Batch verification on every order. No exceptions, no grey-market shortcuts.</p>
            </div>
            <div className="philosophy-block">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 7v5l3 3"/>
                </svg>
              </div>
              <h3>Long-Lasting Performance</h3>
              <p>Eight-to-twelve hour wear is the minimum we&apos;ll catalogue. The Hawas line, Khamrah Waha and 9pm REBEL deliver a full day on skin.</p>
            </div>
            <div className="philosophy-block">
              <div className="philosophy-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <h3>Honest Pricing</h3>
              <p>Designer and niche fragrance at sub-retail. We tell you the brand&apos;s MSRP and what we charge. The math is yours to do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE SOURCE / TIMELINE */}
      <section>
        <div className="container">
          <h2 className="section-head reveal">How We Source</h2>
          <div className="timeline">
            <div className="timeline-step">
              <div className="num">01</div>
              <h3>Source</h3>
              <p>Authorised distributors in the UAE — direct relationships, never resellers.</p>
            </div>
            <div className="timeline-step">
              <div className="num">02</div>
              <h3>Verify</h3>
              <p>Every batch code checked against the brand&apos;s manufacturing database before shipment.</p>
            </div>
            <div className="timeline-step">
              <div className="num">03</div>
              <h3>Ship</h3>
              <p>Climate-controlled freight to Colombo. Customs cleared under our own import license.</p>
            </div>
            <div className="timeline-step">
              <div className="num">04</div>
              <h3>Deliver</h3>
              <p>Tamper-sealed packaging, authenticity card in every box. Island-wide in 48 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="founder">
        <div className="container reveal">
          <div className="founder-photo">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80&face"
              alt="Founder"
            />
          </div>
          <div className="name">The Founder</div>
          <div className="title">Founder · Curator</div>
          <blockquote>
            &ldquo;I started DOF because I was tired of paying tourist prices in my own country. Every bottle on this site is one I&apos;d buy for myself, at a price my friends and I can actually afford. That&apos;s the whole brief.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="contact-cta">
        <div className="container reveal">
          <h2>Let&apos;s Talk Fragrance</h2>
          <p>Questions, recommendations, wholesale enquiries — we read every message.</p>
          <div className="cta-buttons">
            <a href="https://wa.me/94771234567" className="btn btn-primary">
              {whatsappSVG}
              WhatsApp Us
            </a>
            <a href="mailto:hello@deptoffragrance.lk" className="btn btn-outlined">Email Us</a>
          </div>
          <p style={{ marginTop: '32px' }}>hello@deptoffragrance.lk · +94 77 123 4567</p>
        </div>
      </section>

    </main>
  )
}
