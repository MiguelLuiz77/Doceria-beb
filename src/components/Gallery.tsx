import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';

const photos = [
  { src: '/images/bolo-baunilha.svg', alt: 'Bolo de baunilha com camadas de creme', className: 'gallery-photo--tall' },
  { src: '/images/bolo-chocolate.svg', alt: 'Bolo de chocolate com cobertura de ganache', className: '' },
  { src: '/images/torta-morango.svg', alt: 'Torta de morangos com creme', className: 'gallery-photo--wide' },
  { src: '/images/brigadeiros.svg', alt: 'Caixa de brigadeiros artesanais', className: '' },
  { src: '/images/cookies.svg', alt: 'Cookies de chocolate feitos à mão', className: 'gallery-photo--tall gallery-photo--last' },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((current) => current === null ? 0 : (current + 1) % photos.length);
      if (event.key === 'ArrowLeft') setActive((current) => current === null ? 0 : (current - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return <>
    <div className="gallery-grid">
      {photos.map((photo, index) => <button className={`gallery-photo ${photo.className}`} type="button" key={photo.src} onClick={() => setActive(index)} aria-label={`Ampliar imagem: ${photo.alt}`}>
        <img src={photo.src} alt={photo.alt} loading="lazy" width="600" height="700" />
        <span className="gallery-photo__hint">Ver detalhe <Icon name="arrow" /></span>
      </button>)}
    </div>
    {active !== null && createPortal(<div className="lightbox" role="dialog" aria-modal="true" aria-label="Imagem ampliada" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
      <button className="icon-button lightbox__close" type="button" ref={closeRef} onClick={() => setActive(null)} aria-label="Fechar imagem"><Icon name="close" /></button>
      <button className="icon-button lightbox__prev" type="button" onClick={() => setActive((active - 1 + photos.length) % photos.length)} aria-label="Imagem anterior"><Icon name="chevron-left" /></button>
      <figure className="lightbox__figure"><img src={photos[active].src} alt={photos[active].alt} /><figcaption>{photos[active].alt}</figcaption></figure>
      <button className="icon-button lightbox__next" type="button" onClick={() => setActive((active + 1) % photos.length)} aria-label="Próxima imagem"><Icon name="chevron-right" /></button>
    </div>, document.body)}
  </>;
}
