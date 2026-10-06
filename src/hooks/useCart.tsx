import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { products } from '../data/products';

type CartItem = { productId: string; quantity: number };
type Action =
  | { type: 'add'; productId: string }
  | { type: 'set'; productId: string; quantity: number }
  | { type: 'remove'; productId: string }
  | { type: 'clear' };

const storageKey = 'doceria-bb-cart-v1';
const productIds = new Set(products.map(({ id }) => id));

function readCart(): CartItem[] {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    if (!Array.isArray(stored)) return [];
    return stored.filter((item): item is CartItem =>
      Boolean(item && typeof item.productId === 'string' && productIds.has(item.productId)
        && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99),
    );
  } catch {
    return [];
  }
}

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((item) => item.productId === action.productId);
      if (existing) return state.map((item) => item.productId === action.productId
        ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item);
      return [...state, { productId: action.productId, quantity: 1 }];
    }
    case 'set':
      if (action.quantity < 1) return state.filter((item) => item.productId !== action.productId);
      return state.map((item) => item.productId === action.productId
        ? { ...item, quantity: Math.min(99, action.quantity) } : item);
    case 'remove':
      return state.filter((item) => item.productId !== action.productId);
    case 'clear':
      return [];
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, readCart);

  useEffect(() => {
    try { window.localStorage.setItem(storageKey, JSON.stringify(items)); } catch { /* Storage may be disabled. */ }
  }, [items]);

  const add = useCallback((productId: string) => dispatch({ type: 'add', productId }), []);
  const setQuantity = useCallback((productId: string, quantity: number) => dispatch({ type: 'set', productId, quantity }), []);
  const remove = useCallback((productId: string) => dispatch({ type: 'remove', productId }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + (byId.get(item.productId)?.price ?? 0) * item.quantity, 0);
    return { items, count, subtotal, add, setQuantity, remove, clear };
  }, [items, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart precisa estar dentro de CartProvider.');
  return value;
}
