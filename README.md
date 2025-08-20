# Gestok - Sistema de Gestão de Estoque

O Gestok é um sistema moderno de gestão de estoque desenvolvido com tecnologias web atuais, oferecendo uma solução completa para controle de produtos, movimentações de estoque e autenticação de usuários.

## 🚀 Funcionalidades Principais

### 📦 Gestão de Produtos

- **Cadastro de Produtos**: Adicione produtos com nome, descrição, SKU, preço e categoria
- **Categorização**: Organize produtos por categorias para melhor controle
- **Busca e Filtros**: Encontre produtos rapidamente com sistema de busca avançado
- **Edição e Exclusão**: Gerencie seus produtos com operações completas de CRUD

### 📊 Controle de Estoque

- **Movimentações de Estoque**: Registre entradas e saídas de produtos
- **Tipos de Movimento**:
  - Entrada (in): Compra de fornecedor, reposição de estoque
  - Saída (out): Venda para cliente
- **Histórico Completo**: Acompanhe todas as movimentações com timestamps
- **Cálculo Automático**: Sistema calcula automaticamente o estoque atual

### 👥 Sistema de Usuários

- **Autenticação Segura**: Login e registro com validação de email
- **Sessões Persistentes**: Mantenha-se logado com segurança
- **Perfis de Usuário**: Dados pessoais e configurações de conta
- **Isolamento de Dados**: Cada usuário vê apenas seus próprios produtos e movimentações

### 📈 Dashboard e Relatórios

- **Resumo de Estoque**: Visão geral dos produtos e quantidades
- **Histórico de Movimentações**: Timeline completa de entradas e saídas
- **Métricas Importantes**: Estatísticas de produtos mais movimentados

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface do usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI modernos e acessíveis

### Backend e Banco de Dados

- **PostgreSQL** - Banco de dados relacional robusto
- **Drizzle ORM** - ORM type-safe para TypeScript
- **BetterAuth** - Sistema de autenticação moderno

### Formulários e Validação

- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas TypeScript
- **next-safe-action** - Server Actions seguras

### Ferramentas de Desenvolvimento

- **Jest** - Framework de testes
- **ESLint** - Linting de código
- **pnpm** - Gerenciador de pacotes rápido

### Bibliotecas Auxiliares

- **dayjs** - Manipulação de datas
- **react-number-format** - Formatação de números
- **@tanstack/react-query** - Gerenciamento de estado do servidor
- **@tanstack/react-table** - Tabelas avançadas
- **sonner** - Notificações toast
- **lucide-react** - Ícones modernos

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- pnpm (recomendado) ou npm

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Gestok
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gestok"
AUTH_SECRET="sua-chave-secreta-aqui"
```

### 4. Configure o banco de dados

```bash
# Gera as migrações
pnpm db:generate

# Executa as migrações
pnpm db:migrate

# (Opcional) Abre o Drizzle Studio para visualizar o banco
pnpm db:studio
```

### 5. Execute o projeto

```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas e rotas (App Router)
│   ├── (private)/         # Rotas protegidas (requer autenticação)
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── products/      # Gestão de produtos
│   │   └── stock-movements/ # Movimentações de estoque
│   ├── (public)/          # Rotas públicas
│   │   ├── (auth)/        # Autenticação
│   │   └── (home)/        # Página inicial
│   └── api/               # API routes
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── layout/           # Componentes de layout
├── drizzle/              # Configuração do banco de dados
│   ├── schema.ts         # Esquemas das tabelas
│   └── migrations/       # Migrações do banco
├── actions/              # Server Actions
├── lib/                  # Utilitários e configurações
└── hooks/                # Custom hooks
```

## 🗄️ Modelo de Dados

### Tabelas Principais

- **users**: Usuários do sistema
- **products**: Produtos cadastrados
- **categories**: Categorias de produtos
- **stock_movements**: Movimentações de estoque
- **sessions**: Sessões de usuário
- **accounts**: Contas de autenticação

### Relacionamentos

- Usuários podem ter múltiplos produtos
- Produtos pertencem a categorias
- Movimentações estão vinculadas a produtos e usuários
- Sistema de autenticação completo com sessões

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes com cobertura
pnpm test:coverage
```

## 📝 Scripts Disponíveis

- `pnpm dev` - Servidor de desenvolvimento
- `pnpm build` - Build de produção
- `pnpm start` - Servidor de produção
- `pnpm lint` - Verificação de código
- `pnpm test` - Execução de testes
- `pnpm db:generate` - Gerar migrações
- `pnpm db:migrate` - Executar migrações
- `pnpm db:studio` - Abrir Drizzle Studio

## 🔧 Configurações

### Tailwind CSS

Configurado com tema personalizado e componentes do shadcn/ui.

### TypeScript

Configuração estrita com regras de linting otimizadas.

### ESLint

Configuração para Next.js com regras de qualidade de código.

## 🚀 Deploy

O projeto está configurado para deploy na Vercel, mas pode ser adaptado para outras plataformas.

## 📄 Licença

Este projeto é privado e de uso interno.

---

Desenvolvido com ❤️ usando tecnologias modernas de desenvolvimento web.
