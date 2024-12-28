import { Button } from '@/app/_components/ui/button'
import { Transaction } from '@prisma/client'
import { TrashIcon } from 'lucide-react'

interface DeleteTransactionButton {
  transaction: Transaction
}
const DeleteTransactionButton = ({ transaction }: DeleteTransactionButton) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      onClick={() => console.log(transaction.id)}
    >
      <TrashIcon />
    </Button>
  )
}

export default DeleteTransactionButton
