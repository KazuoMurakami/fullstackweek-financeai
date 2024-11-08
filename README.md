# Projeto Exemplo - Sistema de Tarefas
Um sistema simples para gerenciar tarefas diárias, permitindo adicionar, editar e excluir tarefas.

## Tecnologias
- Next.js
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Clerk 
- 

## Funcionalidades
- Cadastro de usuários e autenticação
- Gerenciamento de tarefas com diferentes status (a fazer, em progresso, concluído)
- Exibição de histórico de atividades


## Estrutura de Diretórios



## Fluxo de Funcionalidade - Cadastro de Usuário
1. O usuário acessa `/signup`.
2. Preenche o formulário com nome, email e senha.
3. A API `/api/auth/signup` valida e cria o usuário no banco de dados.
4. Redireciona para a página inicial com o usuário autenticado.
