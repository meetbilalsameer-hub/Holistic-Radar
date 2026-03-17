export interface LeadFormData {
  name: string
  email: string
  company?: string
  website: string
  monthlyTraffic?: string
  monthlyRevenue?: string
  challenge?: string
}

export interface LeadResponse {
  id: string
  analysisId: string
  reportUrl: string
}
