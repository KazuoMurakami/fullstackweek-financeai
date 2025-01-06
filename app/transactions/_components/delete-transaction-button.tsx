'use client'

import { TrashIcon } from 'lucide-react'
import { Transaction } from '@prisma/client'
import { Button } from '@/app/_components/ui/button'
import deleteTransaction from '@/app/_actions/upsert-transaction/delete'

export interface DeleteTransactionButton {
  transaction: Transaction
}

const DeleteTransactionButton = ({ transaction }: DeleteTransactionButton) => {
  const handleDelete = async () => {
    await deleteTransaction({ transaction })
  }
  return (
    <Button
      className="text-muted-foreground"
      variant="ghost"
      size="icon"
      onClick={handleDelete}
    >
      <TrashIcon />
    </Button>
  )
}

export default DeleteTransactionButton
