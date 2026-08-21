export interface PartnerStat {
  value: string
  label: string
}

export interface PartnerCardItem {
  id: string
  name: string
  domain: string
  url?: string
  description: string
  coinImage: string
  coinAlt: string
  coinPosition: 'left' | 'right'
  stats: [PartnerStat, PartnerStat]
}

export interface PartnersSectionConfig {
  badgeText: string
  title: string
  subtitle: string
  backgroundColor: string
  partners: PartnerCardItem[]
}
