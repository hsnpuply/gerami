export interface AssetIntro {
  title: string
  linkText: string
  url: string
  description: string
  badgeColor: string
  accentColor: string
}

export interface PlatformAdvantage {
  id: string
  title: string
  description: string
  iconName: string
}

export interface PlatformFeature {
  id: string
  title: string
  description: string
  tag?: string
}

export interface PlatformStep {
  stepNumber: number
  title: string
  timeBadge?: string
  description: string
}

export interface AboutSectionConfig {
  title: string
  introText: string
  philosophyTitle: string
  philosophyText: string
  licensesTitle: string
  licensesText: string
  assetsTitle: string
  assetsDescription: string
  assets: AssetIntro[]
  assetsNote: string
  advantagesTitle: string
  advantages: PlatformAdvantage[]
  featuresTitle: string
  features: PlatformFeature[]
  howToStartTitle: string
  howToStartSteps: PlatformStep[]
}
