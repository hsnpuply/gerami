export type Timeframe = 'daily' | 'monthly' | 'yearly'
export type MetalId = 'gold' | 'silver' | 'copper'

export interface ChartDataPoint {
  label: string
  price: number
  timestamp?: number
}

export interface MetalMarketItem {
  id: MetalId
  name: string
  fullName: string
  price: number
  unit: string
  color: string
  gradientColor: string
  highPrice: number
  lowPrice: number
  dataByTimeframe: Record<Timeframe, ChartDataPoint[]>
}
