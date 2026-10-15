import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const residences = [
  {
    name: 'Casa da Mata',
    location: 'Jardim Europa, São Paulo',
    details: '468 m² · 4 suítes · 5 vagas',
    price: 'R$ 12.800.000',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85',
    alt: 'Sala de estar contemporânea integrada a um jardim exuberante',
    position: 'center 52%',
    tag: 'Casa',
  },
  {
    name: 'Luz do Atlântico',
    location: 'Joá, Rio de Janeiro',
    details: '392 m² · 3 suítes · 3 vagas',
    price: 'R$ 9.450.000',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85',
    alt: 'Arquitetura de linhas limpas com piscina e vista aberta',
    position: 'center 58%',
    tag: 'Vista mar',
  },
  {
    name: 'Refúgio das Araucárias',
    location: 'Vale do Quilombo, Gramado',
    details: '521 m² · 5 suítes · 4 vagas',
    price: 'R$ 7.900.000',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85',
    alt: 'Interior acolhedor com materiais naturais e luz suave',
    position: 'center 55%',
    tag: 'Campo',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animationFrame = 0
    const updateParallax = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const hero = heroRef.current
        if (!hero) return
        const scrollOffset = Math.min(window.scrollY, hero.offsetHeight)
        hero.style.setProperty('--sky-shift', `${scrollOffset * 0.08}px`)
        hero.style.setProperty('--house-shift', `${scrollOffset * -0.035}px`)
        hero.style.setProperty('--mist-shift', `${scrollOffset * -0.12}px`)
      })
    }

    window.addEventListener('scroll', updateParallax, { passive: true })
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateParallax)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -36px 0px' },
    )

    const revealVisibleTargets = () => {
      revealTargets.forEach((target) => {
        if (target.classList.contains('is-visible')) return
        const bounds = target.getBoundingClientRect()
        if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
          target.classList.add('is-visible')
          observer.unobserve(target)
        }
      })
    }

    document.documentElement.classList.add('motion-ready')
    revealTargets.forEach((target) => observer.observe(target))
    revealVisibleTargets()
    window.addEventListener('scroll', revealVisibleTargets, { passive: true })
    window.addEventListener('resize', revealVisibleTargets)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', revealVisibleTargets)
      window.removeEventListener('resize', revealVisibleTargets)
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Casa Alta, início" onClick={closeMenu}>
          casa<span>alta</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
          <a href="#colecao" onClick={closeMenu}>Imóveis</a>
          <a href="#sobre" onClick={closeMenu}>A Casa Alta</a>
          <a href="#contato" className="nav-contact" onClick={closeMenu}>Converse com a gente <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title" ref={heroRef}>
          <div className="hero-sky" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2200&q=85" alt="" />
          </div>
          <img
            className="hero-house"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2800&q=90"
            alt="Fachada de residência contemporânea integrada ao paisagismo"
            fetchPriority="high"
          />
          <div className="hero-brand" aria-hidden="true">casa alta</div>
          <div className="hero-mist" aria-hidden="true" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="hero-kicker">Imóveis escolhidos com intenção</p>
            <h1 id="hero-title">Encontre<br />o que te move.</h1>
            <p className="hero-description">Um lugar para o próximo capítulo da sua vida.</p>
            <a href="#colecao" className="hero-cta">Explore imóveis <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-bottom">
            <span className="hero-location"><span className="location-mark" /> Joá, Rio de Janeiro</span>
            <a href="#sobre" className="discover-link">Descubra a Casa Alta <span aria-hidden="true">↓</span></a>
          </div>
          <span className="hero-index" aria-hidden="true">01 / 03</span>
        </section>

        <section className="intro section-wrap" id="sobre">
          <div className="intro-label" data-reveal><span className="small-rule" /> Um jeito mais pessoal de encontrar</div>
          <div className="intro-content" data-reveal>
            <h2>O próximo capítulo começa <em>no lugar certo.</em></h2>
            <div className="intro-aside">
              <p>Mais do que encontrar um imóvel, ajudamos você a reconhecer o lugar onde a vida faz sentido. Com escuta atenta, curadoria e presença em cada detalhe.</p>
              <a href="#contato" className="text-link">Conheça a Casa Alta <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="story" aria-labelledby="story-title">
          <div className="story-heading section-wrap" data-reveal>
            <p className="section-kicker">Uma escolha que acompanha você</p>
            <h2 id="story-title">Não é só sobre imóveis.<br /><em>É sobre o que vem depois.</em></h2>
          </div>
          <div className="story-gallery" aria-label="Detalhes de arquitetura e interiores">
            <figure className="story-photo story-photo-one">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85" alt="Casa de arquitetura contemporânea em meio ao jardim" loading="lazy" />
            </figure>
            <figure className="story-photo story-photo-two">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="Sala ampla com luz natural e materiais acolhedores" loading="lazy" />
            </figure>
            <figure className="story-photo story-photo-three">
              <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85" alt="Detalhe de arquitetura com pedra, madeira e vegetação" loading="lazy" />
            </figure>
          </div>
          <div className="story-foot section-wrap" data-reveal>
            <p>A mudança começa antes das chaves. Começa quando alguém entende o que importa para você e transforma possibilidades em um caminho claro.</p>
            <a href="#contato" className="text-link">Encontre seu próximo lugar <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="approach section-wrap" aria-labelledby="approach-title">
          <div className="approach-intro" data-reveal>
            <p className="section-kicker">A Casa Alta, por perto</p>
            <h2 id="approach-title">Imobiliário,<br /><em>com outro olhar.</em></h2>
            <a href="#contato" className="text-link">Comece uma conversa <span aria-hidden="true">↗</span></a>
          </div>
          <div className="approach-steps">
            <p className="steps-label" data-reveal>Como vamos juntos</p>
            <article className="approach-step" data-reveal>
              <span className="step-number">01</span>
              <div><h3>Escutamos de verdade.</h3><p>Entendemos seu momento, seus planos e o que faz um lugar parecer seu.</p></div>
            </article>
            <article className="approach-step" data-reveal>
              <span className="step-number">02</span>
              <div><h3>Encontramos clareza.</h3><p>Organizamos opções e detalhes para você decidir com tranquilidade.</p></div>
            </article>
            <article className="approach-step" data-reveal>
              <span className="step-number">03</span>
              <div><h3>Seguimos ao seu lado.</h3><p>Da primeira visita aos próximos passos, você tem uma equipe presente.</p></div>
            </article>
          </div>
        </section>

        <section className="collection" id="colecao">
          <div className="collection-heading section-wrap" data-reveal>
            <div>
              <p className="section-kicker">Uma seleção para chamar de sua</p>
              <h2>Endereços com <em>presença.</em></h2>
            </div>
            <a href="#contato" className="text-link collection-link">Ver imóveis disponíveis <span aria-hidden="true">↗</span></a>
          </div>
          <div className="property-grid section-wrap">
            {residences.map((residence) => (
              <article className="property" data-reveal key={residence.name}>
                <a className="property-image-link" href="#contato" aria-label={`Consultar ${residence.name}`}>
                  <img
                    src={residence.image}
                    alt={residence.alt}
                    loading="lazy"
                    style={{ objectPosition: residence.position }}
                  />
                  <span className="property-tag">{residence.tag}</span>
                  <span className="property-arrow" aria-hidden="true">↗</span>
                </a>
                <div className="property-info">
                  <div className="property-title-row">
                    <div>
                      <h3>{residence.name}</h3>
                      <p>{residence.location}</p>
                    </div>
                    <span className="property-price">{residence.price}</span>
                  </div>
                  <p className="property-details">{residence.details}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="contact-image" role="img" aria-label="Interior contemporâneo iluminado por luz natural" />
          <div className="contact-panel" data-reveal>
            <p className="section-kicker">Um bom começo</p>
            <h2>Vamos encontrar<br />o seu <em>lugar.</em></h2>
            <p className="contact-intro">Conte um pouco do que procura. Nossa equipe entra em contato para conversar, sem pressa.</p>
            {submitted ? (
              <div className="success-message" role="status">
                <span className="success-mark" aria-hidden="true">✓</span>
                <div><strong>Recebemos sua mensagem.</strong><p>Em breve, alguém da Casa Alta conversa com você.</p></div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                  <span>Seu nome</span>
                  <input name="name" autoComplete="name" placeholder="Como podemos chamar você?" required />
                </label>
                <div className="form-row">
                  <label>
                    <span>E-mail</span>
                    <input name="email" type="email" autoComplete="email" placeholder="voce@email.com" required />
                  </label>
                  <label>
                    <span>O que procura?</span>
                    <select name="interest" defaultValue="" required>
                      <option value="" disabled>Selecione</option>
                      <option>Comprar um imóvel</option>
                      <option>Vender meu imóvel</option>
                      <option>Conversar sobre opções</option>
                    </select>
                  </label>
                </div>
                <button className="submit-button" type="submit">Iniciar conversa <span aria-hidden="true">↗</span></button>
              </form>
            )}
            <p className="form-note">Seus dados são tratados com cuidado e discrição.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#inicio">casa<span>alta</span></a>
        <p>Imóveis para viver por inteiro.</p>
        <a href="mailto:conversa@casaalta.com.br">conversa@casaalta.com.br</a>
        <span className="copyright">© 2026 Casa Alta</span>
      </footer>
    </>
  )
}

export default App
