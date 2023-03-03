export const Currency = (value:any) => Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    maximumSignificantDigits: 3,
  }).format(value);