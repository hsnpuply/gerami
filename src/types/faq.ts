export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqSectionConfig {
  /** Section heading */
  heading: string
  /** Subtitle below heading */
  subtitle: string
  /** FAQ items list */
  items: FaqItem[]
  /** "Read more" button label */
  readMoreLabel: string
  /** "Read more" button link */
  readMoreLink: string
}
