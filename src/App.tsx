import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { Gallery } from './components/Gallery';
import { Icon } from './components/Icon';
import { ProductCard } from './components/ProductCard';
import { Reveal } from './components/Reveal';
import { businessConfig, generalOrderMessage, whatsappLink } from './config/business';
import { productCategories, products, type Product } from './data/products';
import { formatCurrency } from './lib/format';
import { useCart } from './hooks/useCart';

const steps = [
  ['01', 'Ingredientes escolhidos', 'Sabores e texturas que deixam cada receita especial.'],
  ['02', 'Feito à mão', 'O cuidado aparece em cada etapa, do preparo à finalização.'],
  ['03', 'Detalhes com carinho', 'Acabamentos pensados para encantar antes da primeira mordida.'],
  ['04', 'Para o seu momento', 'Uma criação doce para presentear, celebrar e compartilhar.'],
];

const reviews = [
  { quote: 'Este espaço está pronto para receber uma mensagem real de quem já provou.', author: 'Depoimento de cliente — editar', mark: '01' },
  { quote: 'Substitua este texto por uma avaliação autorizada e fiel à experiência.', author: 'Depoimento de cliente — editar', mark: '02' },
  { quote: 'Adicione aqui palavras reais, com a aprovação de quem escreveu.', author: 'Depoimento de cliente — editar', mark: '03' },
];

function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);

  return <section className="hero" id="inicio" aria-label="Apresentação da Doceria B&B">
    <div className="hero-stage">
      {!videoFailed && <video
        className="hero-video"
        src="/videos/hero-doceria-bb.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Confeiteira decorando um bolo"
        onError={() => setVideoFailed(true)}
      />}
      {videoFailed && <img className="hero-video hero-video--fallback" src="/images/hero-poster.jpg" alt="Confeiteira decorando um bolo" />}
      <div className="hero-shade" />
      <div className="hero-copy-wrap">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--light"><Icon name="spark" /> DOCERIA B&amp;B <span>•</span> FEITO COM CARINHO</p>
          <h1>Momentos especiais<br /><em>começam com um doce.</em></h1>
          <p className="hero-copy__description">Criações artesanais, feitas para transformar pequenos encontros em lembranças que ficam.</p>
          <div className="hero-actions">
            <a className="button button--rose" href="#produtos">Conheça nossos doces <Icon name="arrow" /></a>
            <a className="button button--outline-light" href={whatsappLink(generalOrderMessage)} target="_blank" rel="noreferrer">Fazer pedido</a>
          </div>
        </div>
      </div>
      <a className="hero-scroll-note" href="#sobre"><span>Conheça a Doceria</span><span className="hero-scroll-note__line" /></a>
    </div>
  </section>;
}

function SectionIntro({ label, title, description, align = 'left' }: { label: string; title: ReactNode; description?: string; align?: 'left' | 'center' }) {
  return <div className={`section-intro section-intro--${align}`}>
    <p className="eyebrow">{label}</p>
    <h2>{title}</h2>
    {description && <p className="section-intro__description">{description}</p>}
  </div>;
}

function About() {
  return <section className="about section-pad" id="sobre">
    <div className="container about__grid">
      <Reveal className="about__visual-wrap">
        <div className="about__visual"><img src="/images/bolo-baunilha.svg" alt="Bolo artesanal de baunilha com camadas de creme" loading="lazy" width="900" height="1100" />
          <div className="about__seal"><Icon name="heart" /><span>Feito à mão<br />com afeto</span></div>
        </div>
        <span className="about__caption">Um gesto de carinho em cada criação.</span>
      </Reveal>
      <Reveal className="about__copy" delay={100}>
        <p className="eyebrow">A essência B&amp;B</p>
        <h2>Doçura feita para <em>ficar na memória.</em></h2>
        <p>Na Doceria B&amp;B, cada criação nasce do carinho pelas pequenas coisas: uma receita bem cuidada, uma textura no ponto e um acabamento feito com calma.</p>
        <p>Mais do que um doce, queremos estar presente naquele instante que merece ser celebrado — à mesa, em boa companhia, do seu jeito.</p>
        <a className="text-link" href="#processo">Conheça nosso cuidado <Icon name="arrow" /></a>
        <div className="about__signature"><span>B&amp;B</span><i>doces momentos</i></div>
      </Reveal>
    </div>
  </section>;
}

function ProductsSection({ onAdd, onFeaturedAdd }: { onAdd: (product: Product) => void; onFeaturedAdd: (product: Product) => void }) {
  const [activeCategory, setActiveCategory] = useState<(typeof productCategories)[number]>('Todos');
  const filtered = useMemo(() => activeCategory === 'Todos' ? products : products.filter((product) => product.category === activeCategory), [activeCategory]);
  const featured = products.find((product) => product.featured)!;

  return <section className="products-section section-pad" id="produtos">
    <div className="container">
      <Reveal><SectionIntro label="Nosso cardápio" title={<>Escolha seu próximo <em>momento doce.</em></>} description="Receitas feitas com carinho, para celebrar as ocasiões grandes e os dias comuns também." /></Reveal>
      {businessConfig.catalogIsDemo && <p className="demo-note"><Icon name="spark" /> Catálogo e valores ilustrativos — personalize em <code>src/data/products.ts</code>.</p>}
      <div className="product-toolbar" aria-label="Filtrar produtos">
        <div className="category-tabs" role="group" aria-label="Categorias de produtos">
          {productCategories.map((category) => <button key={category} type="button" className={category === activeCategory ? 'category-tab category-tab--active' : 'category-tab'} aria-pressed={category === activeCategory} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <span className="product-toolbar__count">{filtered.length} delícias</span>
      </div>
      <div className="products-grid">
        {filtered.map((product, index) => <Reveal key={product.id} delay={index * 65}><ProductCard product={product} onAdd={onAdd} /></Reveal>)}
      </div>
      <section className="featured-product" aria-labelledby="featured-title">
        <div className="featured-product__visual"><img src={featured.image} alt={featured.imageAlt} loading="lazy" width="700" height="800" /><span className="featured-product__seal"><Icon name="spark" /> Especial<br />B&amp;B</span></div>
        <div className="featured-product__content">
          <p className="eyebrow eyebrow--light">Um carinho a mais</p>
          <h3 id="featured-title">O bolo que vira <em>centro da mesa.</em></h3>
          <p>Camadas macias de chocolate, recheio cremoso e uma cobertura que convida a celebrar. Um clássico para dividir sem pressa.</p>
          <div className="featured-product__meta"><span>{featured.name}</span><strong>{formatCurrency(featured.price)}</strong></div>
          <button className="button button--rose" type="button" onClick={() => onFeaturedAdd(featured)}>Adicionar à sacola <Icon name="arrow" /></button>
          <span className="featured-product__footnote">Produto e valor de demonstração</span>
        </div>
      </section>
    </div>
  </section>;
}

function Process() {
  return <section className="process-section section-pad" id="processo">
    <div className="container">
      <Reveal><SectionIntro label="Do nosso cuidado para você" title={<>O carinho está em <em>cada etapa.</em></>} description="Um processo feito com atenção, do primeiro ingrediente ao último detalhe." align="center" /></Reveal>
      <div className="process-grid">
        {steps.map(([number, title, description], index) => <Reveal key={number} delay={index * 70} className="process-card">
          <span className="process-card__number">{number}</span><span className="process-card__ornament"><Icon name="spark" /></span><h3>{title}</h3><p>{description}</p>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

function Testimonials() {
  return <section className="testimonials section-pad" id="depoimentos">
    <div className="container">
      <Reveal><SectionIntro label="Palavras doces" title={<>Histórias que merecem <em>ser compartilhadas.</em></>} description="Este espaço está preparado para as palavras dos nossos clientes." /></Reveal>
      <p className="demo-note"><Icon name="spark" /> Cartões de demonstração — substitua por avaliações reais, autorizadas e editáveis.</p>
      <div className="reviews-grid">
        {reviews.map((review, index) => <Reveal key={review.mark} delay={index * 70} className="review-card">
          <span className="review-card__mark">“</span><p>{review.quote}</p><div className="review-card__footer"><span className="review-card__stars" aria-label="Avaliação de demonstração">★★★★★</span><span>{review.author}</span></div>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

function Footer() {
  const hasContact = businessConfig.email || businessConfig.address || businessConfig.instagramUrl;
  return <>
    <section className="final-cta" id="contato">
      <div className="final-cta__texture" aria-hidden="true" />
      <div className="container final-cta__inner">
        <p className="eyebrow eyebrow--light">Um convite da B&amp;B</p>
        <h2>Seu próximo momento especial <em>começa aqui.</em></h2>
        <p>Conte para nós o que você está celebrando. A gente ajuda a deixar esse instante ainda mais doce.</p>
        <div className="final-cta__actions"><a className="button button--rose" href={whatsappLink(generalOrderMessage)} target="_blank" rel="noreferrer">Conversar pelo WhatsApp <Icon name="arrow" /></a><a className="button button--outline-light" href="#produtos">Ver o cardápio</a></div>
        {!businessConfig.whatsappNumber && <small>Adicione o número da loja em <code>src/config/business.ts</code> para direcionar o pedido.</small>}
      </div>
    </section>
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand"><a className="brand brand--footer" href="#inicio"><img src="/images/logo-bb.webp" alt="" width="54" height="54" /><span className="brand__wordmark"><strong>Doceria B&amp;B</strong><small>feito com carinho</small></span></a><p>Doces feitos à mão para acompanhar os momentos que importam.</p></div>
          <div className="site-footer__links"><p className="eyebrow">Explore</p><a href="#sobre">Nossa essência</a><a href="#produtos">Cardápio</a><a href="#processo">Nosso cuidado</a><a href="#galeria">Galeria</a></div>
          <div className="site-footer__links"><p className="eyebrow">Fale com a gente</p><a href="#contato">Fazer um pedido</a>{businessConfig.email && <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>}{businessConfig.address && <span>{businessConfig.address}</span>}{businessConfig.instagramUrl && <a href={businessConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <Icon name="instagram" /></a>}{!hasContact && <span>Atualize os canais de contato<br />em src/config/business.ts.</span>}</div>
        </div>
        <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Doceria B&amp;B</span><span>Feito com carinho, em cada detalhe.</span><a href="#inicio">Voltar ao topo ↑</a></div>
      </div>
    </footer>
  </>;
}

export default function App() {
  const { count, add } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | null>(null);
  const addProduct = useCallback((product: Product) => {
    add(product.id);
    setToast(`${product.name} adicionado à sacola`);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  }, [add]);

  useEffect(() => () => { if (toastTimer.current !== null) window.clearTimeout(toastTimer.current); }, []);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header count={count} onCart={() => setCartOpen(true)} />
    <main id="conteudo">
      <Hero />
      <About />
      <ProductsSection onAdd={addProduct} onFeaturedAdd={addProduct} />
      <Process />
      <section className="gallery-section section-pad" id="galeria"><div className="container">
        <Reveal><div className="gallery-heading"><SectionIntro label="Um pouco da nossa mesa" title={<>Feito à mão. <em>Feito para sentir.</em></>} description="Texturas, sabores e pequenos detalhes das criações B&B." /><a className="text-link gallery-heading__link" href="#produtos">Ver cardápio <Icon name="arrow" /></a></div></Reveal>
        <Reveal><Gallery /></Reveal>
      </div></section>
      <Testimonials />
      <Footer />
    </main>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    <div className={`toast ${toast ? 'toast--visible' : ''}`} role="status" aria-live="polite"><Icon name="spark" />{toast}</div>
  </>;
}

