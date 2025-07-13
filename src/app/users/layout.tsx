interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function UsersLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
