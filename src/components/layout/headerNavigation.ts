export interface NavigationLink {
  label: string
  to: string
}

export const mainNavigation: NavigationLink[] = [
  { label: 'خرید طلا', to: '/buy-gold' },
  { label: 'خرید نقره', to: '/buy-silver' },
  { label: 'خرید مس', to: '/buy-copper' },
  { label: 'دانلود اپلیکیشن', to: '/download' },
  { label: 'بلاگ', to: '/blog' },
  { label: 'درباره ما', to: '/about' },
]

export const supportNavigation: NavigationLink[] = [
  { label: 'سوالات متداول', to: '/faq' },
  { label: 'تماس با ما', to: '/contact' },
]

export const rulesNavigation: NavigationLink[] = [
  { label: 'قوانین خرید', to: '/rules/purchase' },
  { label: 'حریم خصوصی', to: '/rules/privacy' },
  { label: 'شرایط استفاده', to: '/rules/terms' },
]