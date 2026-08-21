/**
 * Utility functions for Persian number and price formatting across the project.
 */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

/**
 * Convert any string or number containing English or Arabic digits to Persian digits.
 */
export function toPersianDigits(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return ''
  let str = String(value)
  // Convert English digits
  str = str.replace(/[0-9]/g, (w) => PERSIAN_DIGITS[+w])
  // Convert Arabic digits if any
  str = str.replace(/[\u0660-\u0669]/g, (w) => PERSIAN_DIGITS[ARABIC_DIGITS.indexOf(w)])
  return str
}

/**
 * Format a number as a currency price with 3-digit comma separators and Persian digits.
 * e.g., 19787932 -> "۱۹,۷۸۷,۹۳۲"
 */
export function formatPrice(price: number | string | null | undefined): string {
  if (price === null || price === undefined) return ''
  const cleanStr = typeof price === 'string' ? price.replace(/,/g, '').trim() : String(price)
  const num = Number(cleanStr)
  if (isNaN(num)) {
    return toPersianDigits(price)
  }

  // Format with standard thousands separator
  const parts = Math.round(num).toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return toPersianDigits(parts.join('.'))
}

/**
 * Format a number with Persian digits (with optional separator for large integers)
 */
export function formatNumber(value: number | string | null | undefined): string {
  return formatPrice(value)
}
