export interface DeliveryFeature {
  id: string
  label: string
}

export interface DeliveryAddress {
  title: string
  lines: string[]
  workingHours?: string
  phone?: string
}

export interface DeliveryMapEmbed {
  /** Full Google Maps embed URL */
  embedUrl: string
  /** Open-in-maps link */
  openUrl: string
  /** Neshan or Balad routing url */
  routingUrl?: string
  /** Alt text for the map iframe */
  alt?: string
}

export interface PhysicalDeliveryConfig {
  /** Badge label */
  badgeText: string
  /** Main heading */
  heading: string
  /** Subtitle or secondary text */
  subtitle?: string
  /** Feature checklist items */
  features: DeliveryFeature[]
  /** Map embed configuration */
  map: DeliveryMapEmbed
  /** Address block */
  address: DeliveryAddress
  /** Right decorative image src */
  imageRight?: string
  /** Left decorative image src */
  imageLeft?: string
  /** Right image alt text */
  imageRightAlt?: string
  /** Left image alt text */
  imageLeftAlt?: string
}

