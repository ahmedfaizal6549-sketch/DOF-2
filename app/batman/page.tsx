'use client'

import { useState, useEffect } from 'react'

interface Episode {
  num: number
  title: string
  arc: number
  villain: string
  stars: number
  note?: string
}

const ARCS = [
  {
    id: 0,
    title: 'Arc I — Gotham Awakens',
    sub: 'Batman Establishes His Legend · Episodes 1–9',
    desc: 'Batman is new to Gotham. The first villains emerge from the darkness. These episodes build the world and lock in the tone — dark, psychological, morally complex.',
    accent: '#4a8fd9',
    icon: '🦇',
  },
  {
    id: 1,
    title: 'Arc II — The Rogue Gallery Rises',
    sub: 'Villain Origin Stories · Episodes 10–28',
    desc: "The show's greatest villain arcs. Two-Face's tragedy, Mr. Freeze's Emmy-winning origin, Clayface's heartbreak, and Harley Quinn's world debut. The absolute heart of the series.",
    accent: '#d94a4a',
    icon: '🃏',
  },
  {
    id: 2,
    title: 'Arc III — Robin & The Bat-Family',
    sub: 'Family, Loyalty, and Identity · Episodes 29–38',
    desc: "Dick Grayson's origin and Batman's relationship with his allies. Features the Emmy-winning Robin's Reckoning and Batman's darkest moment of self-doubt in I Am the Night.",
    accent: '#d9a04a',
    icon: '🐦',
  },
  {
    id: 3,
    title: 'Arc IV — The Clown Crime Wave',
    sub: 'Joker, Harley Quinn & Chaos · Episodes 39–53',
    desc: "The Joker and Harley Quinn at their peak. Almost Got 'Im, Harlequinade, Baby-Doll, and Trial are among the greatest animated episodes ever produced — anywhere.",
    accent: '#c040f0',
    icon: '🤡',
  },
  {
    id: 4,
    title: 'Arc V — Freeze, Ivy & Clayface',
    sub: 'Tragedy, Obsession & Redemption · Episodes 54–65',
    desc: "The show's most emotionally brutal arcs. Clayface's final chapter, Mr. Freeze's haunting sequel Deep Freeze, and Harvey Dent's last shot at recovery in Second Chance.",
    accent: '#40c8d9',
    icon: '🧊',
  },
  {
    id: 5,
    title: "Arc VI — Ra's al Ghul & the Underworld",
    sub: 'Ancient Evil & Grand Mythology · Episodes 66–75',
    desc: "Batman faces his most dangerous, centuries-old enemy. The Demon's Quest is a feature-length epic across deserts and Lazarus Pits. Showdown reveals Ra's al Ghul's haunting Old West past.",
    accent: '#40d960',
    icon: '🌿',
  },
  {
    id: 6,
    title: 'Arc VII — Late Gotham',
    sub: 'Final Cases & Escalation · Episodes 76–85',
    desc: "The show's final stretch before The New Batman Adventures. Bane arrives, Batgirl comes into her own, and Gotham's worst is put to rest. A satisfying close to an era.",
    accent: '#d9d040',
    icon: '🌆',
  },
]

const EPISODES: Episode[] = [
  // ARC 1: Gotham Awakens (9)
  { num: 1,  title: 'On Leather Wings',                          arc: 0, villain: 'Man-Bat',                 stars: 1 },
  { num: 2,  title: 'Nothing to Fear',                           arc: 0, villain: 'Scarecrow',               stars: 3, note: '"I am vengeance, I am the night, I am Batman!" — the defining speech' },
  { num: 3,  title: 'The Last Laugh',                            arc: 0, villain: 'Joker',                   stars: 1 },
  { num: 4,  title: 'Pretty Poison',                             arc: 0, villain: 'Poison Ivy',              stars: 2, note: 'Ivy origin — seductive, deadly, unforgettable introduction' },
  { num: 5,  title: 'The Underdwellers',                         arc: 0, villain: 'Sewer King',              stars: 0 },
  { num: 6,  title: 'P.O.V.',                                    arc: 0, villain: 'Rupert Thorne',           stars: 1 },
  { num: 7,  title: 'The Forgotten',                             arc: 0, villain: 'Boss Biggis',             stars: 0 },
  { num: 8,  title: 'Christmas with the Joker',                  arc: 0, villain: 'Joker',                   stars: 1, note: "Joker's first full episode — holiday chaos" },
  { num: 9,  title: 'Be a Clown',                                arc: 0, villain: 'Joker',                   stars: 1 },

  // ARC 2: Rogue Gallery Rises (19)
  { num: 10, title: 'Two-Face Part 1',                           arc: 1, villain: 'Two-Face',                stars: 3, note: "Harvey Dent's tragic fall begins — stunning, cinematic storytelling" },
  { num: 11, title: 'Two-Face Part 2',                           arc: 1, villain: 'Two-Face',                stars: 3 },
  { num: 12, title: 'Heart of Ice',                              arc: 1, villain: 'Mr. Freeze',              stars: 3, note: "★ Emmy Award winner — the greatest villain episode in cartoon history. \"Mercy? I'm beyond that now.\"" },
  { num: 13, title: 'Feat of Clay Part 1',                       arc: 1, villain: 'Clayface',                stars: 2, note: 'Matt Hagen\'s heartbreaking origin as Clayface' },
  { num: 14, title: 'Feat of Clay Part 2',                       arc: 1, villain: 'Clayface',                stars: 2 },
  { num: 15, title: "Joker's Favor",                             arc: 1, villain: 'Joker · Harley Quinn',    stars: 3, note: '⚡ Harley Quinn\'s world debut — one of the most important cartoon episodes ever aired' },
  { num: 16, title: 'Vendetta',                                  arc: 1, villain: 'Killer Croc',             stars: 1 },
  { num: 17, title: 'Fear of Victory',                           arc: 1, villain: 'Scarecrow',               stars: 1 },
  { num: 18, title: 'The Cat and the Claw Part 1',               arc: 1, villain: 'Catwoman',                stars: 2, note: 'Bruce/Selina romance begins — tension you can feel' },
  { num: 19, title: 'The Cat and the Claw Part 2',               arc: 1, villain: 'Catwoman · Red Claw',    stars: 2 },
  { num: 20, title: "It's Never Too Late",                       arc: 1, villain: 'Arnold Stromwell',        stars: 1 },
  { num: 21, title: "I've Got Batman in My Basement",            arc: 1, villain: 'Penguin',                 stars: 0 },
  { num: 22, title: 'Prophecy of Doom',                          arc: 1, villain: 'Nostromos',               stars: 0 },
  { num: 23, title: 'Paging the Crime Doctor',                   arc: 1, villain: 'Rupert Thorne',           stars: 1 },
  { num: 24, title: 'Eternal Youth',                             arc: 1, villain: 'Poison Ivy',              stars: 1, note: 'Ivy turns billionaires into trees — quietly terrifying' },
  { num: 25, title: 'The Cape and Cowl Conspiracy',              arc: 1, villain: 'Josiah Wormwood',         stars: 0 },
  { num: 26, title: 'Perchance to Dream',                        arc: 1, villain: 'Mad Hatter',              stars: 3, note: 'What if Bruce Wayne never became Batman? — the show\'s most devastating "what if"' },
  { num: 27, title: 'Mad as a Hatter',                           arc: 1, villain: 'Mad Hatter',              stars: 2, note: "Jervis Tetch's obsession with Alice — tragic villain origin" },
  { num: 28, title: 'The Strange Secret of Bruce Wayne',         arc: 1, villain: 'Hugo Strange',            stars: 2, note: 'Hugo Strange discovers Batman\'s identity — high-stakes thriller' },

  // ARC 3: Robin & Bat-Family (10)
  { num: 29, title: "Robin's Reckoning Part 1",                  arc: 2, villain: 'Tony Zucco',              stars: 3, note: '★ Emmy Award winner — Dick Grayson\'s origin told in devastating flashback' },
  { num: 30, title: "Robin's Reckoning Part 2",                  arc: 2, villain: 'Tony Zucco',              stars: 3 },
  { num: 31, title: 'Night of the Ninja',                        arc: 2, villain: 'Kyodai Ken',              stars: 1, note: "Bruce Wayne's ninja training revealed" },
  { num: 32, title: 'Day of the Samurai',                        arc: 2, villain: 'Kyodai Ken',              stars: 1, note: 'Sequel — climactic duel at a volcano' },
  { num: 33, title: 'Beware the Gray Ghost',                     arc: 2, villain: 'Mad Bomber',              stars: 3, note: "Adam West voices Bruce Wayne's childhood hero — a love letter to the '60s series" },
  { num: 34, title: 'Appointment in Crime Alley',                arc: 2, villain: 'Roland Daggett',          stars: 2, note: "Batman returns to where his parents died — deeply personal" },
  { num: 35, title: 'I Am the Night',                            arc: 2, villain: 'Various',                 stars: 2, note: "Batman questions his entire mission — the show's most emotionally brutal episode" },
  { num: 36, title: 'His Silicon Soul',                          arc: 2, villain: 'HARDAC Batman',           stars: 1 },
  { num: 37, title: 'Shadow of the Bat Part 1',                  arc: 2, villain: 'Two-Face',                stars: 3, note: "Barbara Gordon becomes Batgirl — her debut episode" },
  { num: 38, title: 'Shadow of the Bat Part 2',                  arc: 2, villain: 'Two-Face · Thorne',       stars: 3 },

  // ARC 4: Clown Crime Wave (15)
  { num: 39, title: 'The Laughing Fish',                         arc: 3, villain: 'Joker',                   stars: 3, note: "Joker tries to copyright fish with his face — insane genius writing" },
  { num: 40, title: "Joker's Wild",                              arc: 3, villain: 'Joker',                   stars: 1 },
  { num: 41, title: 'Harley and Ivy',                            arc: 3, villain: 'Harley Quinn · Poison Ivy', stars: 3, note: 'The iconic duo — crime feminist road-trip, endlessly quotable' },
  { num: 42, title: "Almost Got 'Im",                            arc: 3, villain: 'Joker · All Rogues',      stars: 3, note: "Villains swap 'almost killed Batman' stories around a poker table — all-time fan favourite" },
  { num: 43, title: 'The Man Who Killed Batman',                 arc: 3, villain: 'Joker · Sidney Debris',   stars: 3, note: 'A nobody accidentally kills Batman — dark comedy masterpiece. Joker\'s eulogy is legendary.' },
  { num: 44, title: "If You're So Smart, Why Aren't You Rich?",  arc: 3, villain: 'Riddler',                 stars: 2, note: "Edward Nygma's origin — betrayed genius turned criminal" },
  { num: 45, title: 'What Is Reality?',                          arc: 3, villain: 'Riddler',                 stars: 2, note: 'Riddler traps Batman inside a deadly virtual reality game' },
  { num: 46, title: 'Dreams in Darkness',                        arc: 3, villain: 'Scarecrow',               stars: 1 },
  { num: 47, title: "Riddler's Reform",                          arc: 3, villain: 'Riddler',                 stars: 2, note: 'Can the Riddler actually go straight? Poignant and clever' },
  { num: 48, title: "Make 'Em Laugh",                            arc: 3, villain: 'Joker',                   stars: 1 },
  { num: 49, title: 'Trial',                                     arc: 3, villain: 'Joker · All Rogues',      stars: 3, note: "Every villain puts Batman on trial for creating them — stunning ensemble episode" },
  { num: 50, title: 'Harlequinade',                              arc: 3, villain: 'Joker · Harley Quinn',    stars: 3, note: 'Batman + Harley Quinn team up to stop Joker — hilarious and heartbreaking in the same breath' },
  { num: 51, title: "Harley's Holiday",                          arc: 3, villain: 'Harley Quinn',            stars: 3, note: "Harley tries going straight for one day — one of the show's most human, hopeful episodes" },
  { num: 52, title: 'Baby-Doll',                                 arc: 3, villain: 'Baby-Doll',               stars: 3, note: "A childlike adult actress breaks down — tragic, haunting, unforgettable final scene" },
  { num: 53, title: 'Read My Lips',                              arc: 3, villain: 'Ventriloquist',           stars: 2, note: 'Arnold Wesker and Scarface — a man completely dominated by his puppet' },

  // ARC 5: Freeze, Ivy, Clayface (12)
  { num: 54, title: 'Mudslide',                                  arc: 4, villain: 'Clayface',                stars: 3, note: "Clayface's tragic conclusion — genuinely heartbreaking. The show at its most humane." },
  { num: 55, title: 'Cat Scratch Fever',                         arc: 4, villain: 'Catwoman · Roland Daggett', stars: 1 },
  { num: 56, title: 'Tyger Tyger',                               arc: 4, villain: 'Catwoman · Dr. Dorian',   stars: 1, note: 'Catwoman turned into a literal cat-woman against her will' },
  { num: 57, title: 'House and Garden',                          arc: 4, villain: 'Poison Ivy',              stars: 2, note: 'Ivy tries to live a normal domestic life — quietly unsettling twist' },
  { num: 58, title: 'Terror in the Sky',                         arc: 4, villain: 'Man-Bat',                 stars: 1, note: "Kirk Langstrom's tragedy continues — sequel to On Leather Wings" },
  { num: 59, title: 'Moon of the Wolf',                          arc: 4, villain: 'Werewolf · Professor Milo', stars: 1 },
  { num: 60, title: 'Deep Freeze',                               arc: 4, villain: 'Mr. Freeze · Grant Walker', stars: 3, note: "Heart of Ice sequel — Freeze finds something darker than revenge. Haunting ending." },
  { num: 61, title: 'Second Chance',                             arc: 4, villain: 'Two-Face',                stars: 3, note: "Harvey Dent's last chance at surgery — emotionally devastating payoff to his arc" },
  { num: 62, title: 'Heart of Steel Part 1',                     arc: 4, villain: 'HARDAC',                  stars: 1 },
  { num: 63, title: 'Heart of Steel Part 2',                     arc: 4, villain: 'HARDAC',                  stars: 1 },
  { num: 64, title: 'Blind as a Bat',                            arc: 4, villain: 'Penguin',                 stars: 1 },
  { num: 65, title: 'Zatanna',                                   arc: 4, villain: 'Montague Kane',           stars: 2, note: "Bruce Wayne's past with a stage magician — warm, surprising, beautifully animated" },

  // ARC 6: Ra's al Ghul (10)
  { num: 66, title: 'Off Balance',                               arc: 5, villain: 'Count Vertigo · Talia',   stars: 2, note: "Talia al Ghul introduced — begins the Ra's al Ghul mythology" },
  { num: 67, title: "The Demon's Quest Part 1",                  arc: 5, villain: "Ra's al Ghul",            stars: 3, note: "Ra's al Ghul's grand debut — Talia, the Lazarus Pit, Batman's greatest physical and moral test" },
  { num: 68, title: "The Demon's Quest Part 2",                  arc: 5, villain: "Ra's al Ghul",            stars: 3, note: "Climax of the Ra's arc — operatic in scale, cinematic in execution" },
  { num: 69, title: 'Avatar',                                    arc: 5, villain: "Ra's al Ghul",            stars: 2, note: "Ra's seeks an ancient Egyptian sorceress for immortality — exotic adventure" },
  { num: 70, title: 'Showdown',                                  arc: 5, villain: "Ra's al Ghul",            stars: 3, note: "Ra's al Ghul's Old West past — Jonah Hex appearance — beautiful, standalone masterpiece" },
  { num: 71, title: 'The Mechanic',                              arc: 5, villain: 'Penguin · Earl Cooper',   stars: 1 },
  { num: 72, title: 'The Worry Men',                             arc: 5, villain: 'Mad Hatter',              stars: 1 },
  { num: 73, title: 'Sideshow',                                  arc: 5, villain: 'Killer Croc',             stars: 2, note: "Killer Croc finds a freak show family — unexpectedly poignant" },
  { num: 74, title: 'Lock-Up',                                   arc: 5, villain: 'Lock-Up',                 stars: 1, note: 'Security guard becomes the very monster he tried to stop' },
  { num: 75, title: 'Catwalk',                                   arc: 5, villain: 'Catwoman · Penguin',      stars: 1 },

  // ARC 7: Late Gotham (10)
  { num: 76, title: 'Bane',                                      arc: 6, villain: 'Bane',                    stars: 2, note: "Bane's only B:TAS appearance — hired to destroy Batman once and for all" },
  { num: 77, title: 'Fire from Olympus',                         arc: 6, villain: 'Maxie Zeus',              stars: 1 },
  { num: 78, title: 'The Clock King',                            arc: 6, villain: 'Clock King',              stars: 2, note: "Temple Fugate's obsessive vendetta — precision and patience as weapons" },
  { num: 79, title: 'Birds of a Feather',                        arc: 6, villain: 'Penguin',                 stars: 2, note: 'Penguin falls for a socialite — surprisingly tender character episode' },
  { num: 80, title: 'See No Evil',                               arc: 6, villain: 'Lloyd Ventrix',           stars: 1, note: "Invisible-suit thief tries to reconnect with his daughter — quiet and sad" },
  { num: 81, title: 'Time Out of Joint',                         arc: 6, villain: 'Clock King',              stars: 2, note: 'Clock King returns with time-slowing technology — thrilling follow-up' },
  { num: 82, title: 'A Bullet for Bullock',                      arc: 6, villain: 'Various',                 stars: 2, note: "Bullock-centric noir — surprisingly great, shows his humanity" },
  { num: 83, title: 'The Lion and the Unicorn',                  arc: 6, villain: 'Red Claw',                stars: 1, note: "Alfred's British spy past — fun character expansion" },
  { num: 84, title: 'The Terrible Trio',                         arc: 6, villain: 'The Terrible Trio',       stars: 1, note: "Wealthy socialites commit crimes for thrills — unusually dark moral for a kids' show" },
  { num: 85, title: 'Batgirl Returns',                           arc: 6, villain: 'Penguin · Catwoman',      stars: 2, note: "Batgirl and Catwoman reluctantly team up — great finale energy to close the era" },
]

const STAR_LABELS = ['', 'Worth watching', 'Very good', 'Essential — do not skip']

export default function BatmanPage() {
  const [watched, setWatched] = useState<Set<number>>(new Set())
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem('batman-watched')
      if (raw) setWatched(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  const toggle = (num: number) => {
    setWatched(prev => {
      const next = new Set(prev)
      if (next.has(num)) next.delete(num)
      else next.add(num)
      try { localStorage.setItem('batman-watched', JSON.stringify(Array.from(next))) } catch {}
      return next
    })
  }

  const toggleArc = (id: number) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const markArcAll = (arcId: number, mark: boolean) => {
    const arcNums = EPISODES.filter(e => e.arc === arcId).map(e => e.num)
    setWatched(prev => {
      const next = new Set(prev)
      arcNums.forEach(n => mark ? next.add(n) : next.delete(n))
      try { localStorage.setItem('batman-watched', JSON.stringify(Array.from(next))) } catch {}
      return next
    })
  }

  const total = EPISODES.length
  const watchedCount = mounted ? watched.size : 0
  const pct = Math.round((watchedCount / total) * 100)

  return (
    <main style={{ background: '#08080f', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(180deg, #000 0%, #0a0a14 60%, #08080f 100%)',
        padding: '80px 24px 60px',
        textAlign: 'center',
        borderBottom: '1px solid #1a1a2e',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* bat silhouette watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '240px', opacity: 0.04, pointerEvents: 'none',
          lineHeight: 1, userSelect: 'none',
        }}>🦇</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            background: '#f5d020',
            color: '#000',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '5px 14px',
            borderRadius: '2px',
            marginBottom: '20px',
          }}>
            DC ANIMATED UNIVERSE
          </div>

          <h1 style={{
            fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)',
            fontSize: 'clamp(42px, 8vw, 88px)',
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#fff',
            lineHeight: 1,
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Batman: The Animated Series
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#888',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: '40px',
          }}>
            Story-Optimised Viewing Order · All 85 Episodes · 7 Story Arcs
          </p>

          {/* Progress ring / bar */}
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 800,
              fontFamily: 'var(--font-barlow, sans-serif)',
              color: '#f5d020',
              lineHeight: 1,
            }}>
              {watchedCount}<span style={{ fontSize: '20px', color: '#555', fontWeight: 400 }}>/{total}</span>
            </div>
            <div style={{
              width: 'clamp(200px, 50vw, 400px)',
              height: '6px',
              background: '#1a1a2e',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${pct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #f5d020, #ffa500)',
                borderRadius: '3px',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <div style={{ fontSize: '13px', color: '#555', letterSpacing: '1px' }}>
              {pct}% COMPLETE
            </div>
          </div>
        </div>
      </div>

      {/* ── INSTRUCTIONS ── */}
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '32px 24px 0',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        {[
          { icon: '☑', text: 'Tap any episode to mark it watched' },
          { icon: '▼', text: 'Tap an arc header to expand / collapse' },
          { icon: '💾', text: 'Progress auto-saves to your browser' },
        ].map(tip => (
          <div key={tip.icon} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '13px', color: '#555',
          }}>
            <span style={{ color: '#f5d020', fontSize: '16px' }}>{tip.icon}</span>
            {tip.text}
          </div>
        ))}
      </div>

      {/* ── ARC SECTIONS ── */}
      <div style={{ maxWidth: '860px', margin: '32px auto 0', padding: '0 16px' }}>
        {ARCS.map(arc => {
          const arcEps = EPISODES.filter(e => e.arc === arc.id)
          const arcWatched = mounted ? arcEps.filter(e => watched.has(e.num)).length : 0
          const arcDone = arcWatched === arcEps.length
          const isOpen = expanded.has(arc.id)

          return (
            <div key={arc.id} style={{
              marginBottom: '12px',
              border: `1px solid ${isOpen ? arc.accent + '40' : '#1a1a2e'}`,
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}>
              {/* Arc header */}
              <div
                onClick={() => toggleArc(arc.id)}
                style={{
                  background: isOpen ? `linear-gradient(135deg, #0d0d18, ${arc.accent}12)` : '#0d0d18',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  userSelect: 'none',
                  transition: 'background 0.2s',
                }}
              >
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{arc.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-barlow, sans-serif)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: arcDone ? arc.accent : '#e8e8e8',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    lineHeight: 1.2,
                  }}>
                    {arc.title}
                    {arcDone && <span style={{ marginLeft: '8px', fontSize: '14px' }}>✓</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#555', marginTop: '2px', letterSpacing: '0.5px' }}>
                    {arc.sub}
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-barlow, sans-serif)',
                    color: arc.accent,
                  }}>
                    {arcWatched}/{arcEps.length}
                  </div>
                  <div style={{ fontSize: '18px', color: '#444', marginTop: '2px' }}>
                    {isOpen ? '▲' : '▼'}
                  </div>
                </div>
              </div>

              {/* Arc body */}
              {isOpen && (
                <div style={{ background: '#0a0a12' }}>
                  {/* Arc description + mark all */}
                  <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #1a1a2e',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                  }}>
                    <p style={{ flex: 1, fontSize: '13px', color: '#666', lineHeight: 1.6, minWidth: '200px' }}>
                      {arc.desc}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={e => { e.stopPropagation(); markArcAll(arc.id, true) }}
                        style={{
                          fontSize: '11px',
                          padding: '5px 10px',
                          background: arc.accent + '20',
                          color: arc.accent,
                          border: `1px solid ${arc.accent}40`,
                          borderRadius: '4px',
                          cursor: 'pointer',
                          letterSpacing: '0.5px',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Mark all watched
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); markArcAll(arc.id, false) }}
                        style={{
                          fontSize: '11px',
                          padding: '5px 10px',
                          background: '#1a1a2e',
                          color: '#555',
                          border: '1px solid #2a2a3e',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          letterSpacing: '0.5px',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Reset arc
                      </button>
                    </div>
                  </div>

                  {/* Episode list */}
                  {arcEps.map((ep, i) => {
                    const done = mounted && watched.has(ep.num)
                    return (
                      <div
                        key={ep.num}
                        onClick={() => toggle(ep.num)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '14px',
                          padding: '14px 24px',
                          borderTop: i === 0 ? 'none' : '1px solid #111118',
                          cursor: 'pointer',
                          background: done ? '#0f0f1a' : 'transparent',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => {
                          if (!done)(e.currentTarget as HTMLDivElement).style.background = '#0d0d16'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.background = done ? '#0f0f1a' : 'transparent'
                        }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '3px',
                          border: `2px solid ${done ? arc.accent : '#2a2a3e'}`,
                          background: done ? arc.accent : 'transparent',
                          flexShrink: 0,
                          marginTop: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}>
                          {done && <span style={{ color: '#000', fontSize: '12px', fontWeight: 700, lineHeight: 1 }}>✓</span>}
                        </div>

                        {/* Ep number */}
                        <div style={{
                          width: '28px',
                          fontSize: '12px',
                          color: '#333',
                          fontWeight: 600,
                          flexShrink: 0,
                          marginTop: '3px',
                          fontFamily: 'var(--font-barlow, sans-serif)',
                        }}>
                          {String(ep.num).padStart(2, '0')}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{
                              fontSize: '15px',
                              fontWeight: 500,
                              color: done ? '#444' : '#d8d8d8',
                              textDecoration: done ? 'line-through' : 'none',
                              transition: 'all 0.15s',
                            }}>
                              {ep.title}
                            </span>
                            {ep.stars > 0 && (
                              <span
                                title={STAR_LABELS[ep.stars]}
                                style={{
                                  fontSize: '11px',
                                  color: ep.stars === 3 ? '#f5d020' : ep.stars === 2 ? '#c8a000' : '#7a6020',
                                  letterSpacing: '-1px',
                                }}
                              >
                                {'★'.repeat(ep.stars)}
                              </span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', flexWrap: 'wrap' }}>
                            <span style={{
                              fontSize: '11px',
                              color: arc.accent + '80',
                              background: arc.accent + '14',
                              padding: '1px 7px',
                              borderRadius: '10px',
                              fontWeight: 500,
                            }}>
                              {ep.villain}
                            </span>
                          </div>
                          {ep.note && (
                            <p style={{
                              fontSize: '12px',
                              color: done ? '#2a2a3a' : '#4a4a6a',
                              marginTop: '5px',
                              lineHeight: 1.5,
                              fontStyle: 'italic',
                              transition: 'color 0.15s',
                            }}>
                              {ep.note}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── FOOTER NOTE ── */}
      <div style={{
        maxWidth: '860px',
        margin: '40px auto 0',
        padding: '0 24px',
        borderTop: '1px solid #1a1a2e',
        paddingTop: '32px',
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontSize: '11px', color: '#f5d020', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Legend</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { stars: '★★★', label: 'Essential — do not skip' },
              { stars: '★★', label: 'Very good' },
              { stars: '★', label: 'Worth watching' },
              { stars: '', label: 'Filler / completionist' },
            ].map(r => (
              <div key={r.stars} style={{ display: 'flex', gap: '8px', fontSize: '12px', alignItems: 'center' }}>
                <span style={{ color: '#f5d020', width: '32px', letterSpacing: '-1px' }}>{r.stars || '—'}</span>
                <span style={{ color: '#444' }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontSize: '11px', color: '#f5d020', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>About this order</div>
          <p style={{ fontSize: '12px', color: '#3a3a5a', lineHeight: 1.7 }}>
            Episodes are grouped by story arc and character development rather than original air date. The production order differs significantly from broadcast — this sequence tells a coherent narrative from Batman's early days through the show's final chapter.
          </p>
        </div>
      </div>
    </main>
  )
}
