import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#002b49]">
          Criar Nova Reunião Sacramental
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Preencha os dados da reunião, presidência, hinos e oradores.
        </p>
      </div>

      <MeetingForm />
    </div>
  );
}
