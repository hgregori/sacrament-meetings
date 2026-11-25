'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting as dbUpdateMeeting, deleteMeeting as dbDeleteMeeting } from './meetings-db';
import type { MeetingType } from './types';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'A data é obrigatória'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    error: 'Selecione um tipo de reunião válido',
  }),
  presiding: z.string().min(1, 'O nome de quem preside é obrigatório'),
  conducting: z.string().min(1, 'O nome de quem dirige é obrigatório'),
  openingHymnNumber: z.coerce.number().min(1, 'O número do hino de abertura deve ser maior que 0'),
  openingHymnTitle: z.string().min(1, 'O título do hino de abertura é obrigatório'),
  openingPrayer: z.string().min(1, 'A primeira oração é obrigatória'),
  sacramentHymnNumber: z.coerce.number().min(1, 'O número do hino sacramental deve ser maior que 0'),
  sacramentHymnTitle: z.string().min(1, 'O título do hino sacramental é obrigatório'),
  closingHymnNumber: z.coerce.number().min(1, 'O número do hino de encerramento deve ser maior que 0'),
  closingHymnTitle: z.string().min(1, 'O título do hino de encerramento é obrigatório'),
  closingPrayer: z.string().min(1, 'A última oração é obrigatória'),
  announcements: z.string().optional(),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.boolean().optional(),
  speaker1Name: z.string().optional(),
  speaker1Topic: z.string().optional(),
  speaker2Name: z.string().optional(),
  speaker2Topic: z.string().optional(),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
    announcements?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    speaker1Name?: string[];
    speaker1Topic?: string[];
    speaker2Name?: string[];
    speaker2Topic?: string[];
  };
  message?: string | null;
};

export async function createMeeting(_prevState: State, formData: FormData): Promise<State> {
  const rawData = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    announcements: formData.get('announcements')?.toString(),
    wardBusiness: formData.get('wardBusiness')?.toString(),
    stakeBusiness: formData.get('stakeBusiness') === 'on' || formData.get('stakeBusiness') === 'true',
    speaker1Name: formData.get('speaker1Name')?.toString(),
    speaker1Topic: formData.get('speaker1Topic')?.toString(),
    speaker2Name: formData.get('speaker2Name')?.toString(),
    speaker2Topic: formData.get('speaker2Topic')?.toString(),
  };

  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos inválidos ou faltando. Por favor, verifique o formulário.',
    };
  }

  const { data } = validatedFields;

  const speakers = [];
  if (data.speaker1Name?.trim()) {
    speakers.push({
      name: data.speaker1Name.trim(),
      topic: data.speaker1Topic?.trim() ?? '',
      type: 'speaker' as const,
    });
  }
  if (data.speaker2Name?.trim()) {
    speakers.push({
      name: data.speaker2Name.trim(),
      topic: data.speaker2Topic?.trim() ?? '',
      type: 'speaker' as const,
    });
  }

  const announcements = data.announcements
    ? data.announcements.split('\n').map((a) => a.trim()).filter(Boolean)
    : [];

  const wardBusiness = data.wardBusiness
    ? data.wardBusiness.split('\n').map((b) => ({ description: b.trim() })).filter((b) => b.description)
    : [];

  try {
    await addMeeting({
      date: data.date,
      meetingType: data.meetingType as MeetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      openingHymn: {
        number: data.openingHymnNumber,
        title: data.openingHymnTitle,
      },
      openingPrayer: data.openingPrayer,
      sacramentHymn: {
        number: data.sacramentHymnNumber,
        title: data.sacramentHymnTitle,
      },
      speakers,
      closingHymn: {
        number: data.closingHymnNumber,
        title: data.closingHymnTitle,
      },
      closingPrayer: data.closingPrayer,
      announcements,
      wardBusiness,
      stakeBusiness: data.stakeBusiness ?? false,
    });
  } catch (error) {
    console.error('Failed to create meeting in database:', error);
    return {
      message: 'Erro no banco de dados: Não foi possível criar a reunião.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: State,
  formData: FormData
): Promise<State> {
  const rawData = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    announcements: formData.get('announcements')?.toString(),
    wardBusiness: formData.get('wardBusiness')?.toString(),
    stakeBusiness: formData.get('stakeBusiness') === 'on' || formData.get('stakeBusiness') === 'true',
    speaker1Name: formData.get('speaker1Name')?.toString(),
    speaker1Topic: formData.get('speaker1Topic')?.toString(),
    speaker2Name: formData.get('speaker2Name')?.toString(),
    speaker2Topic: formData.get('speaker2Topic')?.toString(),
  };

  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos inválidos ou faltando. Por favor, verifique o formulário.',
    };
  }

  const { data } = validatedFields;

  const speakers = [];
  if (data.speaker1Name?.trim()) {
    speakers.push({
      name: data.speaker1Name.trim(),
      topic: data.speaker1Topic?.trim() ?? '',
      type: 'speaker' as const,
    });
  }
  if (data.speaker2Name?.trim()) {
    speakers.push({
      name: data.speaker2Name.trim(),
      topic: data.speaker2Topic?.trim() ?? '',
      type: 'speaker' as const,
    });
  }

  const announcements = data.announcements
    ? data.announcements.split('\n').map((a) => a.trim()).filter(Boolean)
    : [];

  const wardBusiness = data.wardBusiness
    ? data.wardBusiness.split('\n').map((b) => ({ description: b.trim() })).filter((b) => b.description)
    : [];

  try {
    const updated = await dbUpdateMeeting(id, {
      date: data.date,
      meetingType: data.meetingType as MeetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      openingHymn: {
        number: data.openingHymnNumber,
        title: data.openingHymnTitle,
      },
      openingPrayer: data.openingPrayer,
      sacramentHymn: {
        number: data.sacramentHymnNumber,
        title: data.sacramentHymnTitle,
      },
      speakers,
      closingHymn: {
        number: data.closingHymnNumber,
        title: data.closingHymnTitle,
      },
      closingPrayer: data.closingPrayer,
      announcements,
      wardBusiness,
      stakeBusiness: data.stakeBusiness ?? false,
    });

    if (!updated) {
      return {
        message: 'Reunião não encontrada para atualização.',
      };
    }
  } catch (error) {
    console.error('Failed to update meeting in database:', error);
    return {
      message: 'Erro no banco de dados: Não foi possível atualizar a reunião.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await dbDeleteMeeting(id);
    revalidatePath('/meetings');
  } catch (error) {
    console.error('Failed to delete meeting in database:', error);
    throw new Error('Falha ao deletar a reunião.');
  }
}

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email ou senha inválidos.';
        default:
          return 'Algo deu errado durante o login.';
      }
    }
    throw error;
  }
}
