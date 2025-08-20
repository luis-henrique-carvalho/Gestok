# Inventário

## Visão Geral

A funcionalidade de Inventário permite visualizar o histórico atual de cada produto baseado nas movimentações de estoque (stock movements). Esta tela fornece uma visão consolidada do estado atual do estoque de todos os produtos, incluindo estatísticas e histórico de movimentações.

## Funcionalidades

### 1. Dashboard de Estoque

- **Resumo Estatístico**: Cards mostrando total de produtos, estoque normal, estoque baixo e produtos sem estoque
- **Status Visual**: Indicadores coloridos para diferentes níveis de estoque
- **Busca**: Campo de busca para filtrar produtos por nome

### 2. Tabela de Inventário

- **SKU**: Código único do produto
- **Nome**: Nome do produto
- **Categoria**: Categoria do produto
- **Estoque Atual**: Quantidade atual em estoque (calculada a partir das movimentações)
- **Status**: Indicador visual do status do estoque (Normal, Estoque baixo, Sem estoque)
- **Últimas Movimentações**: Preview das 3 últimas movimentações com ícones e datas
- **Ações**: Botão para ver histórico completo

### 3. Histórico Detalhado

- **Modal de Histórico**: Visualização completa de todas as movimentações de um produto
- **Paginação**: Navegação através do histórico de movimentações
- **Detalhes**: Data, tipo (entrada/saída), quantidade e motivo da movimentação

## Estrutura de Arquivos

```
src/app/(private)/inventory/
├── actions/
│   ├── get-inventory.ts          # Busca inventário com estatísticas
│   ├── get-product-history.ts    # Busca histórico de um produto
│   └── index.ts                  # Exportações das actions
├── components/
│   ├── table/
│   │   └── table-columns.tsx     # Definição das colunas da tabela
│   ├── inventory-summary.tsx     # Componente de resumo estatístico
│   ├── product-history-modal.tsx # Modal de histórico detalhado
│   └── search-inventory.tsx      # Componente de busca
└── page.tsx                      # Página principal do inventário
```

## Cálculo de Estoque

O estoque atual é calculado dinamicamente através de uma query SQL que:

1. Filtra apenas produtos que têm movimentações de estoque relacionadas
2. Soma todas as entradas (`movement_type = 'in'`)
3. Subtrai todas as saídas (`movement_type = 'out'`)
4. Retorna o saldo atual

### Filtro de Produtos com Movimentações

A query foi otimizada para usar INNER JOIN em vez de EXISTS, proporcionando melhor performance:

```sql
-- Query otimizada com INNER JOIN
SELECT DISTINCT
  products.id,
  products.name,
  products.description,
  products.sku,
  products.price,
  products.user_id,
  products.category_id,
  products.created_at,
  products.updated_at
FROM products
INNER JOIN stock_movements ON stock_movements.product_id = products.id
WHERE products.user_id = ?
ORDER BY products.updated_at DESC
LIMIT ? OFFSET ?;
```

### Cálculo do Estoque Atual

```sql
COALESCE(
  (
    SELECT SUM(
      CASE
        WHEN movement_type = 'in' THEN quantity
        WHEN movement_type = 'out' THEN -quantity
      END
    )
    FROM stock_movements
    WHERE product_id = ?
  ), 0
)
```

## Status do Estoque

- **Normal**: Mais de 5 unidades em estoque
- **Estoque baixo**: 1 a 5 unidades em estoque
- **Sem estoque**: 0 unidades em estoque

## Navegação

A funcionalidade está acessível através do menu lateral:

- **Ícone**: ClipboardList
- **Rota**: `/inventory`
- **Posição**: Entre "Produtos" e "Movimentações"

## Tecnologias Utilizadas

- **Next.js 15**: App Router para roteamento
- **TypeScript**: Tipagem estática
- **Drizzle ORM**: Queries otimizadas com SQL raw
- **shadcn/ui**: Componentes de interface
- **Tailwind CSS**: Estilização
- **dayjs**: Formatação de datas
- **next-safe-action**: Server Actions seguras
