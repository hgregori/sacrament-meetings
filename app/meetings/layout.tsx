export default function MeetingsLayout({
  children,
}: LayoutProps<'/meetings'>) {
  return (
    <section>
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#002b49]">
          Reuniões Sacramentais
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Consulte o histórico e próximas agendas da Ala Osasco
        </p>
      </div>
      {children}
    </section>
  );
}
