export interface FeatureItem {
  id: string
  title: string
  description: string
  iconName?: string
  isDouble?: boolean
}

export interface LicenseBadgeItem {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  alt: string
}
