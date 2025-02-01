export interface PaymentData {
    month: string
    volume: number
  }
  
  export interface YearlyData {
    [key: string]: PaymentData[]
  }
  
  