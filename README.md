# Finance AI - Sistema de Gerenciamento Financeiro

Um sistema completo para gerenciar transações financeiras, permitindo adicionar, editar, excluir e visualizar transações, além de exibir gráficos e relatórios financeiros.

## Tecnologias
- Next.js
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Clerk (Autenticação)
- Stripe (Pagamentos)
- Radix UI (Componentes de Interface)
- Zod (Validação de Esquemas)

## Funcionalidades
- Autenticação de usuários com Clerk
- Gerenciamento de transações financeiras (adicionar, editar, excluir)
- Exibição de gráficos financeiros (despesas por categoria, transações recentes)
- Integração com Stripe para gerenciamento de assinaturas
- Interface responsiva e moderna com Tailwind CSS e Radix UI

## Estrutura de Diretórios
- `app/`: Contém as páginas e componentes da aplicação
  - `api/`: Rotas de API para webhooks e outras funcionalidades
  - `transactions/`: Páginas e componentes relacionados a transações
  - `subscription/`: Páginas e componentes relacionados a assinaturas
  - `_components/`: Componentes reutilizáveis da aplicação
  - `_data/`: Funções para obter dados do banco de dados
  - `_lib/`: Bibliotecas e utilitários
- `prisma/`: Configuração do Prisma ORM
- `public/`: Arquivos públicos (imagens, fontes, etc.)
- `styles/`: Arquivos de estilo global

## Fluxo de Funcionalidade - Cadastro de Usuário
1. O usuário acessa `/signup`.
2. Preenche o formulário com nome, email e senha.
3. A API `/api/auth/signup` valida e cria o usuário no banco de dados.
4. Redireciona para a página inicial com o usuário autenticado.

## Fluxo de Funcionalidade - Gerenciamento de Transações
1. O usuário acessa `/transactions`.
2. Visualiza a lista de transações.
3. Pode adicionar uma nova transação clicando no botão "Adicionar Transação".
4. Pode editar ou excluir uma transação existente.

## Fluxo de Funcionalidade - Assinaturas
1. O usuário acessa `/subscription`.
2. Pode adquirir um plano premium clicando no botão "Adquirir plano".
3. Redireciona para o checkout do Stripe.
4. Após a confirmação do pagamento, o plano premium é ativado.

## Configuração do Projeto
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd finance-ai
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<database>
   NEXT_PUBLIC_CLERK_FRONTEND_API=<clerk_frontend_api>
   CLERK_API_KEY=<clerk_api_key>
   STRIPE_SECRET_KEY=<stripe_secret_key>
   STRIPE_WEBHOOK_SECRET=<stripe_webhook_secret>
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<stripe_publishable_key>
   NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=<stripe_customer_portal_url>
   ```
4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Scripts Disponíveis
- `dev`: Inicia o servidor de desenvolvimento
- `build`: Compila a aplicação para produção
- `start`: Inicia o servidor de produção
- `lint`: Executa o ESLint para verificar problemas no código
- `format`: Formata o código usando Prettier

## Contribuição
Sinta-se à vontade para contribuir com melhorias e novas funcionalidades. Abra uma issue ou envie um pull request.

## Licença
Este projeto está licenciado sob a licença MIT.
