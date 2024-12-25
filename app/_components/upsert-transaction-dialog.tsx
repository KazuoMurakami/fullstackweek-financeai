'use client'
import { Button } from './ui/button'
// Importa componentes UI para estruturar diálogos, formulários e elementos de entrada de dados.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { MoneyInput } from './money-input' // Entrada específica para valores monetários
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select' // Componente de seleção com dropdown
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '../_constants/transactions' // Constantes com opções para tipo, categoria e método de pagamento
import { DatePicker } from './ui/date-picker'
import { z } from 'zod' // Validação de esquema com Zod
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from '@prisma/client' // Enums Prisma para garantir tipagem das transações
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' // Conecta o Zod com o react-hook-form para validação
import { upsertTransaction } from '../_actions/upsert-transaction' // Função para criar ou atualizar uma transação
import { useState } from 'react'

// Define o esquema do formulário com Zod, para validar as entradas do usuário.
const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório.', // Valida nome
  }),
  amount: z
    .number({
      required_error: 'O valor é obrigatório.', // Valida valor positivo
    })
    .positive({
      message: 'O valor deve ser positivo.',
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: 'O tipo é obrigatório.', // Valida tipo de transação com enums do Prisma
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: 'A categoria é obrigatória.', // Valida categoria de transação com enums
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: 'O método de pagamento é obrigatório.', // Valida método de pagamento com enums
  }),
  date: z.date({
    required_error: 'A data é obrigatória.', // Valida data
  }),
})

// Tipo inferido pelo Zod a partir do esquema para auxiliar com tipos no TypeScript.
type FormSchema = z.infer<typeof formSchema>

interface UpsertTransactionDialogProps {
  isOpen: boolean // Indica se o diálogo está aberto
  defaultValues?: FormSchema // Valores padrão para campos, se disponíveis
  transactionId?: string // ID da transação, caso seja uma edição
  setIsOpen: (isOpen: boolean) => void // Função para abrir ou fechar o diálogo
}

const UpsertTransactionDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  setIsOpen,
}: UpsertTransactionDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema), // Usa Zod para resolver a validação
    defaultValues: defaultValues ?? {
      // Define valores padrão caso não sejam passados
      amount: 50,
      category: TransactionCategory.OTHER,
      date: new Date(),
      name: '',
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  })

  // Função chamada no envio do formulário para criar ou atualizar uma transação
  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertTransaction({ ...data, id: transactionId }) // Atualiza ou cria transação
      setIsOpen(false) // Fecha o diálogo após o envio
      form.reset() // Limpa o formulário
    } catch (error) {
      console.error(error) // Lida com erros de envio
    } finally {
      setIsSubmitting(false)
    }
  }

  // Define se é uma atualização com base na presença de um transactionId
  const isUpdate = Boolean(transactionId)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Controla abertura do diálogo e reseta o formulário ao fechar
        setIsOpen(open)
        if (!open) {
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Atualizar' : 'Criar'} transação
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        {/* Inicia o formulário utilizando o react-hook-form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Campo de Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo de Valor com MoneyInput */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo Tipo de Transação com Select */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo Categoria */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo Método de Pagamento */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método de pagamento..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo Data */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Rodapé do Diálogo com Botões de Ação */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Processando...' // Exibe feedback durante o envio
                  : isUpdate
                    ? 'Atualizar'
                    : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpsertTransactionDialog
