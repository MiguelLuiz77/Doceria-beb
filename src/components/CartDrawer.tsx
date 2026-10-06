import { useEffect, useRef } from 'react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { businessConfig, whatsappLink } from '../config/business';
import { formatCurrency } from '../lib/format';
import { Icon } from './Icon';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, setQuantity, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;
  const detailed = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const orderMessage = [
    `Olá! Gostaria de fazer um pedido na ${businessConfig.name}:`,
    '',
    ...detailed.map(({ product, quantity }) => `${quantity}x ${product.name} — ${formatCurrency(product.price)} cada (subtotal: ${formatCurrency(product.price * quantity)})`),
    '',
    `Total: ${formatCurrency(subtotal)}`,
  ].join('\n');

  const checkout = () => window.open(whatsappLink(orderMessage), '_blank', 'noopener,noreferrer');

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-drawer__header">
          <div><p className="eyebrow">Seu momento começa aqui</p><h2 id="cart-title">Sua sacola <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2></div>
          <button className="icon-button cart-drawer__close" ref={closeRef} type="button" onClick={onClose} aria-label="Fechar carrinho"><Icon name="close" /></button>
        </div>

        {detailed.length ? <>
          <ul className="cart-list">
            {detailed.map(({ product, quantity }) => <li className="cart-item" key={product.id}>
              <img src={product.image} alt="" width="88" height="100" />
              <div className="cart-item__main">
                <div className="cart-item__top"><div><p className="cart-item__category">{product.category}</p><h3>{product.name}</h3></div><button className="text-button cart-item__remove" type="button" onClick={() => remove(product.id)}>Remover</button></div>
                <div className="cart-item__bottom">
                  <div className="quantity-control" aria-label={`Quantidade de ${product.name}`}>
                    <button type="button" onClick={() => setQuantity(product.id, quantity - 1)} aria-label={`Diminuir ${product.name}`}><Icon name="minus" /></button>
                    <span aria-live="polite">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(product.id, quantity + 1)} aria-label={`Aumentar ${product.name}`}><Icon name="plus" /></button>
                  </div>
                  <strong>{formatCurrency(product.price * quantity)}</strong>
                </div>
              </div>
            </li>)}
          </ul>
          <div className="cart-drawer__footer">
            <div className="cart-subtotal"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
            <p>Entrega e detalhes finais combinados pelo WhatsApp.</p>
            <button className="button button--dark button--wide" type="button" onClick={checkout}>Finalizar pelo WhatsApp <Icon name="arrow" /></button>
            <span className="cart-disclaimer">O catálogo e os valores atuais são demonstrativos.</span>
          </div>
        </> : <div className="cart-empty">
          <span className="cart-empty__icon"><Icon name="bag" /></span>
          <h3>Uma doçura ainda vai chegar por aqui.</h3>
          <p>Explore o cardápio e escolha o que combina com o seu momento.</p>
          <a className="button button--dark" href="#produtos" onClick={onClose}>Ver o cardápio <Icon name="arrow" /></a>
        </div>}
      </aside>
    </div>
  );
}
