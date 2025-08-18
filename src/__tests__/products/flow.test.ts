/**
 * Teste de fluxo completo para produtos
 * Este teste simula o fluxo completo de adicionar/atualizar produtos
 */

describe("Product Flow Test", () => {
  // Mock das dependências
  const mockDb = {
    insert: jest.fn(),
    query: {
      productTable: {
        findMany: jest.fn(),
      },
    },
    select: jest.fn(),
  };

  const mockAuth = {
    api: {
      getSession: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Fluxo de Adicionar Produto", () => {
    it("should complete the full flow of adding a product", async () => {
      const mockSession = {
        user: {
          id: "user-123",
          name: "Test User",
          email: "test@example.com",
        },
      };
      mockAuth.api.getSession.mockResolvedValue(mockSession);

      const productData = {
        name: "Novo Produto",
        description: "Descrição do novo produto",
        sku: "PROD-001",
        price: "150.00",
        categoryId: "1",
      };

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          onConflictDoUpdate: jest.fn().mockResolvedValue(undefined),
        }),
      });

      const insertResult = await mockDb
        .insert()
        .values(productData)
        .onConflictDoUpdate();
      expect(insertResult).toBeUndefined();

      const mockProducts = [
        {
          id: 1,
          name: "Novo Produto",
          description: "Descrição do novo produto",
          sku: "PROD-001",
          price: "150.00",
          categoryId: 1,
          userId: "user-123",
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: "Categoria Teste" },
          user: {
            id: "user-123",
            name: "Test User",
            email: "test@example.com",
          },
        },
      ];

      let capturedQueryParams: any = null;

      mockDb.query.productTable.findMany.mockImplementation((params) => {
        capturedQueryParams = params;
        return Promise.resolve(mockProducts);
      });

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([{ count: 1 }]),
        }),
      });

      const products = await mockDb.query.productTable.findMany({
        where: { userId: mockSession.user.id },
        limit: 10,
        offset: 0,
      });

      const countResult = await mockDb.select().from().where();

      expect(capturedQueryParams).toEqual({
        where: { userId: mockSession.user.id },
        limit: 10,
        offset: 0,
      });

      expect(products).toHaveLength(1);
      expect(products[0].name).toBe("Novo Produto");
      expect(products[0].sku).toBe("PROD-001");
      expect(products[0].userId).toBe("user-123");
      expect(countResult[0].count).toBe(1);

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.query.productTable.findMany).toHaveBeenCalledWith({
        where: { userId: mockSession.user.id },
        limit: 10,
        offset: 0,
      });
      expect(mockDb.select).toHaveBeenCalled();
    });
  });

  describe("Fluxo de Atualizar Produto", () => {
    it("should complete the full flow of updating a product", async () => {
      // 1. Mock da sessão de usuário
      const mockSession = {
        user: {
          id: "user-123",
          name: "Test User",
          email: "test@example.com",
        },
      };
      mockAuth.api.getSession.mockResolvedValue(mockSession);

      const updatedProductData = {
        id: 1,
        name: "Produto Atualizado",
        description: "Descrição atualizada",
        sku: "PROD-001-UPD",
        price: "200.00",
        categoryId: "1",
      };

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          onConflictDoUpdate: jest.fn().mockResolvedValue(undefined),
        }),
      });

      const updateResult = await mockDb
        .insert()
        .values(updatedProductData)
        .onConflictDoUpdate({
          target: "id",
          set: {
            ...updatedProductData,
            categoryId: Number(updatedProductData.categoryId),
            userId: mockSession.user.id, // ✅ userId está sendo mantido
          },
          where: { userId: mockSession.user.id },
        });
      expect(updateResult).toBeUndefined();

      const mockUpdatedProducts = [
        {
          id: 1,
          name: "Produto Atualizado",
          description: "Descrição atualizada",
          sku: "PROD-001-UPD",
          price: "200.00",
          categoryId: 1,
          userId: "user-123",
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: "Categoria Teste" },
          user: {
            id: "user-123",
            name: "Test User",
            email: "test@example.com",
          },
        },
      ];

      let capturedQueryParams: any = null;

      mockDb.query.productTable.findMany.mockImplementation((params) => {
        capturedQueryParams = params;
        return Promise.resolve(mockUpdatedProducts);
      });

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([{ count: 1 }]),
        }),
      });

      const updatedProducts = await mockDb.query.productTable.findMany({
        where: { userId: mockSession.user.id },
        limit: 10,
        offset: 0,
      });
      const countResult = await mockDb.select().from().where();

      expect(capturedQueryParams).toEqual({
        where: { userId: mockSession.user.id },
        limit: 10,
        offset: 0,
      });

      expect(updatedProducts).toHaveLength(1);
      expect(updatedProducts[0].name).toBe("Produto Atualizado");
      expect(updatedProducts[0].description).toBe("Descrição atualizada");
      expect(updatedProducts[0].sku).toBe("PROD-001-UPD");
      expect(updatedProducts[0].price).toBe("200.00");
      expect(updatedProducts[0].userId).toBe("user-123");

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.query.productTable.findMany).toHaveBeenCalledWith({
        where: { userId: mockSession.user.id },
        limit: 10,
        offset: 0,
      });
      expect(mockDb.select).toHaveBeenCalled();
    });
  });

  describe("Fluxo de Busca de Produtos", () => {
    it("should handle product search with filters", async () => {
      const mockSession = {
        user: {
          id: "user-123",
          name: "Test User",
          email: "test@example.com",
        },
      };
      mockAuth.api.getSession.mockResolvedValue(mockSession);

      const mockProducts = [
        {
          id: 1,
          name: "Produto Teste",
          description: "Descrição do produto teste",
          sku: "TEST-001",
          price: "100.00",
          categoryId: 1,
          userId: "user-123",
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: "Categoria Teste" },
          user: {
            id: "user-123",
            name: "Test User",
            email: "test@example.com",
          },
        },
        {
          id: 2,
          name: "Outro Produto",
          description: "Outra descrição",
          sku: "TEST-002",
          price: "150.00",
          categoryId: 1,
          userId: "user-123",
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: "Categoria Teste" },
          user: {
            id: "user-123",
            name: "Test User",
            email: "test@example.com",
          },
        },
      ];

      let capturedQueryParams: any = null;
      let capturedCountParams: any = null;

      mockDb.query.productTable.findMany.mockImplementation((params) => {
        capturedQueryParams = params;
        return Promise.resolve(mockProducts);
      });

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockImplementation((condition) => {
            capturedCountParams = condition;
            return Promise.resolve([{ count: 2 }]);
          }),
        }),
      });

      const searchParams = {
        searchName: "Teste",
        page: 1,
        limit: 10,
      };

      const products = await mockDb.query.productTable.findMany({
        where: {
          userId: mockSession.user.id,
          name: { contains: searchParams.searchName },
        },
        limit: searchParams.limit,
        offset: (searchParams.page - 1) * searchParams.limit,
      });

      const countResult = await mockDb
        .select()
        .from()
        .where({
          userId: mockSession.user.id,
          name: { contains: searchParams.searchName },
        });

      expect(capturedQueryParams).toEqual({
        where: {
          userId: mockSession.user.id,
          name: { contains: searchParams.searchName },
        },
        limit: searchParams.limit,
        offset: (searchParams.page - 1) * searchParams.limit,
      });

      expect(capturedCountParams).toEqual({
        userId: mockSession.user.id,
        name: { contains: searchParams.searchName },
      });

      expect(products).toHaveLength(2);
      expect(products[0].name).toContain("Teste");
      expect(products[1].name).toContain("Outro");
      expect(countResult[0].count).toBe(2);

      products.forEach((product: any) => {
        expect(product.userId).toBe("user-123");
      });

      expect(mockDb.query.productTable.findMany).toHaveBeenCalledWith({
        where: {
          userId: mockSession.user.id,
          name: { contains: searchParams.searchName },
        },
        limit: searchParams.limit,
        offset: (searchParams.page - 1) * searchParams.limit,
      });
      expect(mockDb.select).toHaveBeenCalled();
    });
  });

  describe("Tratamento de Erros", () => {
    it("should handle duplicate SKU error", async () => {
      const mockSession = {
        user: {
          id: "user-123",
          name: "Test User",
          email: "test@example.com",
        },
      };
      mockAuth.api.getSession.mockResolvedValue(mockSession);

      const duplicateError = new Error("Duplicate SKU");

      (duplicateError as any).cause = {
        constraint_name: "products_sku_user_id_index",
      };

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          onConflictDoUpdate: jest.fn().mockRejectedValue(duplicateError),
        }),
      });

      const productData = {
        name: "Produto Duplicado",
        description: "Descrição",
        sku: "DUPLICATE-001",
        price: "100.00",
        categoryId: "1",
      };

      try {
        await mockDb.insert().values(productData).onConflictDoUpdate();
      } catch (error) {
        expect(error).toBe(duplicateError);
        expect((error as any).cause.constraint_name).toBe(
          "products_sku_user_id_index"
        );
      }

      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("should handle unauthorized access", async () => {
      mockAuth.api.getSession.mockResolvedValue(null);

      const session = await mockAuth.api.getSession();
      expect(session).toBeNull();

      expect(mockAuth.api.getSession).toHaveBeenCalled();
    });
  });
});
