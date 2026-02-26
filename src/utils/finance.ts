export type CompoundInputs = {
  principal: number
  monthly: number
  annualRate: number
  years: number
}

export type CompoundResult = {
  futureValue: number
  totalContrib: number
  totalInterest: number
}

export const calculateCompound = ({
  principal,
  monthly,
  annualRate,
  years,
}: CompoundInputs): CompoundResult => {
  const months = years * 12
  const monthlyRate = annualRate / 100 / 12
  let futureValue = 0

  if (months <= 0) {
    futureValue = principal
  } else if (monthlyRate === 0) {
    futureValue = principal + monthly * months
  } else {
    const growth = Math.pow(1 + monthlyRate, months)
    futureValue = principal * growth + monthly * ((growth - 1) / monthlyRate)
  }

  const totalContrib = principal + monthly * months
  const totalInterest = Math.max(0, futureValue - totalContrib)

  return { futureValue, totalContrib, totalInterest }
}
