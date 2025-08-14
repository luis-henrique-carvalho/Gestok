export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full space-y-6 p-6" role="main">{children}</main>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex w-full items-center justify-between" role="banner">{children}</header>
  );
};

export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full space-y-1">{children}</div>;
};

export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export const PageDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

export const PageActions = ({ children }: { children: React.ReactNode }) => {
  return <nav className="flex items-center gap-2" aria-label="Ações da página" role="navigation">{children}</nav>;
};

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <section className="space-y-6" role="region" aria-label="Conteúdo principal">{children}</section>;
};
