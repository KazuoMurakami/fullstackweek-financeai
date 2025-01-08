import { ReactNode } from 'react'

interface percentageItemProps {
  icon: ReactNode
  title: string
  value: number
}

const PercentageItem = ({ icon, title, value }: percentageItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-white bg-opacity-[3%] p-3 rounded-lg">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="font-bold text-sm">{value}%</p>
    </div>
  )
}

export default PercentageItem
