import { useEffect, useState } from 'react';
import { Icon } from './Icon';

const links = [
  ['Sobre', '#sobre'],
  ['Cardápio', '#produtos'],
  ['Nosso cuidado', '#processo'],
  ['Galeria', '#galeria'],
  ['Depoimentos', '#depoimentos'],
];

export function Header({ count, onCart }: { count: number; onCart: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <a className="brand" href="#inicio" aria-label="Doceria B&B — início" onClick={closeMenu}>
          <img src="/images/logo-bb.webp" alt="" width="52" height="52" />
          <span className="brand__wordmark"><strong>Doceria B&amp;B</strong><small>feito com carinho</small></span>
        </a>

        <nav id="mobile-menu" className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Navegação principal">
          {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="site-nav__mobile-contact" href="#contato" onClick={closeMenu}>Faça seu pedido <Icon name="arrow" /></a>
        </nav>

        <div className="site-header__actions">
          <button className="icon-button cart-trigger" type="button" onClick={onCart} aria-label={`Abrir carrinho${count ? `, ${count} ${count === 1 ? 'item' : 'itens'}` : ', vazio'}`}>
            <Icon name="bag" />
            <span className="cart-trigger__label">Sacola</span>
            <span className="cart-count" aria-hidden="true">{count > 99 ? '99+' : count}</span>
          </button>
          <a className="header-cta" href="#contato">Fazer pedido <Icon name="arrow" /></a>
          <button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((open) => !open)}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}

