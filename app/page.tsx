"use client";

import { useEffect, useState, type CSSProperties } from "react";

const eventDate = new Date("2026-08-19T20:00:00-03:00");

const flyingCaps = Array.from({ length: 42 }, (_, index) => {
  const direction = index % 2 === 0 ? 1 : -1;
  const spin = direction * (390 + ((index * 53) % 430));
  const rise = 128 + ((index * 19) % 40);
  return {
    "--cap-left": `${(index * 29 + 5) % 101}%`,
    "--cap-size": `${58 + ((index * 47) % 112)}px`,
    "--cap-delay": `${((index % 14) * 0.045 + Math.floor(index / 14) * 0.11).toFixed(2)}s`,
    "--cap-duration": `${(1.72 + ((index * 13) % 7) * 0.1).toFixed(2)}s`,
    "--cap-drift": `${direction * (7 + ((index * 17) % 22))}vw`,
    "--cap-mid-spin": `${Math.round(spin * 0.56)}deg`,
    "--cap-spin": `${spin}deg`,
    "--cap-mid-rise": `${Math.round(rise * -0.58)}vh`,
    "--cap-rise": `${-rise}vh`,
  } as CSSProperties;
});

function timeLeft() {
  const gap = Math.max(0, eventDate.getTime() - Date.now());
  return {
    dias: Math.floor(gap / 86400000),
    horas: Math.floor((gap / 3600000) % 24),
    min: Math.floor((gap / 60000) % 60),
  };
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [countdown, setCountdown] = useState(timeLeft());

  useEffect(() => {
    const id = window.setInterval(() => setCountdown(timeLeft()), 60000);
    return () => window.clearInterval(id);
  }, []);

  function handleOpen() {
    if (opening) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
      return;
    }
    setOpening(true);
    window.setTimeout(() => setOpen(true), 720);
    window.setTimeout(() => setOpening(false), 2600);
  }

  return (
    <main className={open ? "site is-open" : "site"}>
      <section className={opening ? "cover is-tossing" : "cover"} aria-hidden={open}>
        <button className="canva-cover" onClick={handleOpen} disabled={opening} aria-label="Abrir o convite">
          <span className="cover-cap-emblem" aria-hidden="true">
            <img src="/capelo-lavanda.png" alt="" />
          </span>
          <span className="sr-only">Abrir o convite</span>
        </button>
        <div className="cover-sparkles" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <span key={index}>✦</span>)}
        </div>
      </section>

      {opening && (
        <div className="graduation-toss" aria-hidden="true">
          {flyingCaps.map((style, index) => (
            <span className="toss-cap" style={style} key={index}>
              <img src="/capelo-voando-lavanda.png" alt="" />
            </span>
          ))}
        </div>
      )}

      <section className="invitation" aria-hidden={!open}>
        <header className="hero">
          <nav><span className="monogram">B</span><span>19 · 08 · 26</span></nav>
          <div className="hero-copy">
            <p className="eyebrow">depois de tantos códigos, chegou o grande dia</p>
            <h1>Minha<br/><em>Colação</em></h1>
            <p className="intro">Quero você comigo para celebrar o fim de um ciclo e o começo de tudo que vem depois.</p>
          </div>
          <div className="scroll-cue">Role para descobrir <span>↓</span></div>
        </header>

        <section className="countdown-section">
          <p className="eyebrow dark">está chegando</p>
          <div className="countdown">
            {Object.entries(countdown).map(([label, value]) => (
              <div className="count-item" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section className="details-section">
          <div className="section-heading">
            <span className="index">01</span>
            <div><p className="eyebrow dark">a cerimônia</p><h2>Onde tudo<br/><em>acontece</em></h2></div>
          </div>
          <div className="detail-grid">
            <article className="date-card">
              <span>AGOSTO</span><strong>19</strong>
            </article>
            <article className="info-card">
              <div><span className="icon">◷</span><p><small>Abertura dos portões</small><strong>17h30</strong><em>Chegue cedo para garantir um bom lugar.</em></p></div>
              <div><span className="icon">✦</span><p><small>Início da cerimônia</small><strong>20h</strong></p></div>
              <div><span className="icon">◇</span><p><small>Valor do convite</small><strong>R$ 50,00</strong></p></div>
            </article>
          </div>
          <article className="location-card">
            <p className="eyebrow">local</p>
            <h3>Universidade Católica<br/>de Brasília</h3>
            <p>Campus Taguatinga</p>
            <a href="https://www.google.com.br/maps/place/Universidade+Cat%C3%B3lica+de+Bras%C3%ADlia+-+C%C3%A2mpus+Taguatinga/@-15.8651042,-48.0327127,17z/data=!3m1!4b1!4m6!3m5!1s0x935a2d97a15b0507:0x3c3e4472ee75d834!8m2!3d-15.8651094!4d-48.0301378!16s%2Fm%2F02pklqk?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Abrir no mapa <span>↗</span></a>
          </article>
        </section>

        <section className="after-section">
          <span className="index">02</span>
          <p className="eyebrow">depois da cerimônia</p>
          <h2>Vamos brindar<br/><em>essa conquista?</em></h2>
          <div className="restaurant">
            <div><small>Nos encontramos no</small><strong>Mineirinho<br/>Chopperia</strong></div>
            <a href="https://www.google.com/maps/search/?api=1&query=Mineirinho+Chopperia+Bras%C3%ADlia" target="_blank" rel="noreferrer" aria-label="Ver Mineirinho Chopperia no mapa">↗</a>
          </div>
        </section>

        <footer>
          <img src="/capelo-lavanda.png" alt="" />
          <h2>Espero você!</h2>
          <p>19 de agosto de 2026 · Brasília</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Voltar ao início ↑</button>
        </footer>
      </section>
    </main>
  );
}
