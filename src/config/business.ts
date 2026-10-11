export const businessConfig = {
  name: 'Mariah! Doce Bar',
  whatsappNumber: '', // Configure com o código do país e DDD, sem espaços ou símbolos.
  instagramUrl: '',
  email: '',
  address: '',
  catalogIsDemo: true,
} as const;

export function whatsappLink(message: string) {
  const number = businessConfig.whatsappNumber.replace(/\D/g, '');
  const recipient = number ? `/${number}` : '/';
  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`;
}

export const generalOrderMessage = `Olá! Gostaria de conhecer o cardápio da ${businessConfig.name}.`;
