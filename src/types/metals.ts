export type MetalType = 'gold' | 'silver' | 'copper'
export type VisualSide = 'left' | 'right'

export interface MetalThemeConfig {
  accentColor: string
  badgeBg: string
  badgeBorder: string
  badgeTextColor: string
  iconBg: string
  checkmarkBg: string
  cardBorderColor?: string
  glowColor?: string
}

export interface MetalItem {
  id: string
  slug: MetalType
  title: string
  badgeText: string
  description: string
  features: string[]
  ctaText: string
  ctaLink: string
  visualSide: VisualSide
  theme: MetalThemeConfig
}
