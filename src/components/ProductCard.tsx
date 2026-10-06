import { memo } from 'react';
import type { Product } from '../data/products';
import { Icon } from './Icon';
import { formatCurrency } from '../lib/format';

export const ProductCard = memo(function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return (
    <article className={`product-card ${product.available ? '' : 'product-card--unavailable'}`}>
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.imageAlt} loading="lazy" width="600" height="700" />
        {product.featured && <span className="product-card__tag">Queridinho da casa</span>}
        {!product.available && <span className="product-card__tag product-card__tag--muted">Indisponível</span>}
        <button className="product-card__add" type="button" disabled={!product.available} onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name} à sacola`}>
          <Icon name="plus" />
        </button>
      </div>
      <div className="product-card__body">
        <div className="product-card__eyebrow">{product.category}</div>
        <div className="product-card__title-row"><h3>{product.name}</h3><span>{formatCurrency(product.price)}</span></div>
        <p>{product.description}</p>
      </div>
    </article>
  );
});
