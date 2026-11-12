export default function AdminLayout({
  children,
}: LayoutProps<'/'>) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-slate-100 p-4 border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Painel de Liderança (Área Administrativa)
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

