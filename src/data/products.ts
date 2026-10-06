export type ProductCategory = 'Bolos' | 'Doces' | 'Presentes';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  available: boolean;
  featured?: boolean;
};

// Catálogo e valores ilustrativos. Edite este arquivo com o cardápio e os preços reais.
export const products: Product[] = [
  {
    id: 'bolo-chocolate',
    name: 'Bolo de chocolate',
    category: 'Bolos',
    description: 'Massa de cacau, brigadeiro cremoso e finalização delicada.',
    price: 89,
    image: '/images/bolo-chocolate.svg',
    imageAlt: 'Ilustração editorial de bolo de chocolate com ganache',
    available: true,
    featured: true,
  },
  {
    id: 'torta-morango',
    name: 'Torta de morango',
    category: 'Bolos',
    description: 'Creme leve, morangos frescos e uma base amanteigada.',
    price: 72,
    image: '/images/torta-morango.svg',
    imageAlt: 'Ilustração editorial de torta de morango com creme',
    available: true,
  },
  {
    id: 'brigadeiros',
    name: 'Caixa de brigadeiros',
    category: 'Presentes',
    description: 'Seis unidades feitas à mão para dividir — ou não.',
    price: 36,
    image: '/images/brigadeiros.svg',
    imageAlt: 'Ilustração editorial de brigadeiros artesanais em uma caixa',
    available: true,
  },
  {
    id: 'cookies',
    name: 'Cookies da casa',
    category: 'Doces',
    description: 'Borda crocante, centro macio e chocolate em cada mordida.',
    price: 28,
    image: '/images/cookies.svg',
    imageAlt: 'Ilustração editorial de cookies com pedaços de chocolate',
    available: true,
  },
  {
    id: 'bolo-baunilha',
    name: 'Bolo de baunilha',
    category: 'Bolos',
    description: 'Camadas macias, baunilha perfumada e cobertura de creme.',
    price: 82,
    image: '/images/bolo-baunilha.svg',
    imageAlt: 'Ilustração editorial de bolo claro com creme de baunilha',
    available: true,
  },
  {
    id: 'trufas',
    name: 'Trufas de chocolate',
    category: 'Presentes',
    description: 'Pequenos presentes de chocolate intenso e acabamento artesanal.',
    price: 42,
    image: '/images/trufas.svg',
    imageAlt: 'Ilustração editorial de trufas de chocolate',
    available: true,
  },
];

export const productCategories = ['Todos', 'Bolos', 'Doces', 'Presentes'] as const;
