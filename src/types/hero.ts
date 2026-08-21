export type MetalType = 'gold' | 'copper' | 'silver'

export interface MetalPriceItem {
  id: string
  name: string
  metal: MetalType
  price: number
  unit: string
  color: string
  positionClass?: string
  changePercent?: number
}

export interface HeroContentProps {
  titlePrimary?: string
  titleSecondary?: string
  descriptionLine1?: string
  descriptionLine2?: string
  ctaText?: string
  ctaLink?: string
}
