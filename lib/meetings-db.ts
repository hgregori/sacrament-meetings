import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting, MeetingType } from './types';

// Fallback in-memory data for local development when DATABASE_URL is not yet set
const fallbackMeetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Galvão',
    openingHymn: { number: 4, title: 'No Monte a Bandeira' },
    openingPrayer: 'Irmã Luciana Galvão',
    wardBusiness: [{ description: 'Nenhum' }],
    stakeBusiness: false,
    sacramentHymn: { number: 101, title: 'Na Corte Celestial' },
    speakers: [
      { name: 'Irmão Gabriel', topic: 'Fé', type: 'speaker' },
      { name: 'Irmão Marcos', topic: 'Fé em Jesus Cristo', type: 'speaker' },
    ],
    closingHymn: { number: 166, title: 'Chamados a Servir' },
    closingPrayer: 'Irmão Levi',
    announcements: ['Caravana ao Templo'],
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'regular',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Galvão',
    openingHymn: { number: 2, title: 'Amanhece o Dia' },
    openingPrayer: 'Irmã Paula Mendes',
    wardBusiness: [{ description: 'Boas-vindas aos visitantes' }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: 'Sim, Eu Te Seguirei' },
    speakers: [
      { name: 'Irmão Ricardo', topic: 'Arrependimento', type: 'speaker' },
      { name: 'Irmã Juliana', topic: 'O Poder da Oração', type: 'speaker' },
    ],
    closingHymn: { number: 223, title: 'Faze o Bem' },
    closingPrayer: 'Irmão Carlos Almeida',
    announcements: ['Mutirão de limpeza da capela no sábado'],
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'testimony',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Gabriel',
    openingHymn: { number: 19, title: 'Graças Damos, Ó Deus' },
    openingPrayer: 'Irmã Mariana Souza',
    wardBusiness: [{ description: 'Apresentação de novos chamados' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'Ao Partirmos o Pão' },
    speakers: [
      { name: 'Irmão Felipe', topic: 'Serviço Cristão', type: 'speaker' },
      { name: 'Coro da Ala', topic: '', type: 'musical-number' },
      { name: 'Irmã Patrícia', topic: 'Caridade', type: 'speaker' },
    ],
    closingHymn: { number: 181, title: 'Onde Encontro a Paz?' },
    closingPrayer: 'Irmão Daniel Rocha',
    announcements: ['Serão para os jovens na sexta-feira'],
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'regular',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Marcos',
    openingHymn: { number: 27, title: 'Louvor ao Profeta' },
    openingPrayer: 'Irmã Renata Oliveira',
    wardBusiness: [
      { description: 'Reconhecimento dos missionários retornados' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'Ó Meu Pai' },
    speakers: [
      {
        name: 'Irmão André',
        topic: 'A Restauração do Evangelho',
        type: 'speaker',
      },
      {
        name: 'Irmã Camila',
        topic: 'Seguir os Profetas Vivos',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 42, title: 'Brilha em Mim' },
    closingPrayer: 'Irmão Thiago Santos',
    announcements: ['Preparação para a conferência da estaca'],
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'stake',
    presiding: 'Presidente da Estaca Oliveira',
    conducting: 'Irmão Levi',
    openingHymn: { number: 134, title: 'Eu Sei que Vive Meu Senhor' },
    openingPrayer: 'Irmã Aline Ferreira',
    wardBusiness: [{ description: 'Nenhum assunto da ala' }],
    stakeBusiness: true,
    sacramentHymn: { number: 116, title: 'Jesus, o Cristo Já Nasceu' },
    speakers: [
      { name: 'Irmão Eduardo', topic: 'Esperança em Cristo', type: 'speaker' },
      {
        name: 'Irmã Fernanda',
        topic: 'A Expiação de Jesus Cristo',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 152, title: 'Com Fervor Fizeste a Prece?' },
    closingPrayer: 'Irmão Lucas Pereira',
    announcements: ['Atividade de história da família no próximo domingo'],
  },
  {
    id: 6,
    date: '2026-06-07',
    meetingType: 'testimony',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Galvão',
    openingHymn: { number: 57, title: 'Tal Como um Facho' },
    openingPrayer: 'Irmã Sofia Castro',
    wardBusiness: [{ description: 'Apoio a novo secretário da ala' }],
    stakeBusiness: false,
    sacramentHymn: { number: 108, title: 'Mansos e Reverentes' },
    speakers: [
      { name: 'Irmão Lucas', topic: 'Testemunho do Livro de Mórmon', type: 'speaker' },
      { name: 'Irmã Beatriz', topic: 'Ouvir a Voz do Espírito', type: 'speaker' },
    ],
    closingHymn: { number: 89, title: 'Se ao Senhor Seguir' },
    closingPrayer: 'Irmão Samuel Ramos',
    announcements: ['Reunião de pais e líderes dos jovens'],
  },
  {
    id: 7,
    date: '2026-06-14',
    meetingType: 'regular',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Gabriel',
    openingHymn: { number: 1, title: 'A Alva Rompe' },
    openingPrayer: 'Irmã Clara Martins',
    wardBusiness: [{ description: 'Agradecimento aos voluntários' }],
    stakeBusiness: false,
    sacramentHymn: { number: 113, title: 'Em Humildade, Salvador' },
    speakers: [
      { name: 'Irmão Leonardo', topic: 'Trabalho do Templo e História da Família', type: 'speaker' },
      { name: 'Irmã Laura', topic: 'Paz em Cristo nos Momentos Difíceis', type: 'speaker' },
    ],
    closingHymn: { number: 136, title: 'Que Firme Alicerce' },
    closingPrayer: 'Irmão Mateus Costa',
    announcements: ['Piquenique da ala no próximo sábado'],
  },
  {
    id: 8,
    date: '2026-06-21',
    meetingType: 'special',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Marcos',
    openingHymn: { number: 6, title: 'Castelo Forte' },
    openingPrayer: 'Irmã Helena Barbosa',
    wardBusiness: [{ description: 'Desobrigação com voto de agradecimento' }],
    stakeBusiness: false,
    sacramentHymn: { number: 115, title: 'Lembrando a Morte de Jesus' },
    speakers: [
      { name: 'Irmão Roberto Silva', topic: 'O Poder dos Convênios', type: 'speaker' },
      { name: 'Quarteto das Moças', topic: '', type: 'musical-number' },
      { name: 'Irmã Clarice Lima', topic: 'Discipulado no Cotidiano', type: 'speaker' },
    ],
    closingHymn: { number: 63, title: 'Vinde a Mim' },
    closingPrayer: 'Irmão Gustavo Prado',
    announcements: ['Conferência de jovens no final do mês'],
  },
  {
    id: 9,
    date: '2026-06-28',
    meetingType: 'regular',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Levi',
    openingHymn: { number: 125, title: 'Avante, ao Templo Iremos' },
    openingPrayer: 'Irmã Vanessa Nunes',
    wardBusiness: [{ description: 'Nenhum assunto da ala' }],
    stakeBusiness: false,
    sacramentHymn: { number: 109, title: 'Pai Celestial, Nós Te Louvamos' },
    speakers: [
      { name: 'Irmão Pedro Guimarães', topic: 'A Força do Exemplo Familiar', type: 'speaker' },
      { name: 'Irmã Miriam Pires', topic: 'Confiar no Senhor com Todo o Coração', type: 'speaker' },
    ],
    closingHymn: { number: 153, title: 'Mais Perto Quero Estar' },
    closingPrayer: 'Irmão Arthur Silveira',
    announcements: ['Jejum de ala no primeiro domingo de julho'],
  },
];

interface DatabaseRow {
  id: number;
  date: string | Date;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: unknown;
  opening_prayer: string;
  ward_business: unknown;
  stake_business: boolean;
  sacrament_hymn: unknown;
  speakers: unknown;
  closing_hymn: unknown;
  closing_prayer: string;
}

function parseJSONField<T>(field: unknown, defaultValue: T): T {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field) as T;
    } catch {
      return defaultValue;
    }
  }
  return (field as T) ?? defaultValue;
}

function mapRowToMeeting(row: DatabaseRow): SacramentMeeting {
  const dateStr =
    row.date instanceof Date
      ? row.date.toISOString().split('T')[0]
      : String(row.date).split('T')[0];

  return {
    id: row.id,
    date: dateStr,
    meetingType: row.meeting_type as MeetingType,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: Array.isArray(row.announcements) ? row.announcements : [],
    openingHymn: parseJSONField(row.opening_hymn, { number: 0, title: '' }),
    openingPrayer: row.opening_prayer,
    wardBusiness: parseJSONField(row.ward_business, []),
    stakeBusiness: Boolean(row.stake_business),
    sacramentHymn: parseJSONField(row.sacrament_hymn, { number: 0, title: '' }),
    speakers: parseJSONField(row.speakers, []),
    closingHymn: parseJSONField(row.closing_hymn, { number: 0, title: '' }),
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(options?: {
  date?: string | null;
  query?: string | null;
  page?: number;
  pageSize?: number;
}): Promise<{ meetings: SacramentMeeting[]; totalCount: number }> {
  const databaseUrl = process.env.DATABASE_URL;

  // Use database when DATABASE_URL is configured
  if (databaseUrl) {
    try {
      const sql = neon(databaseUrl);

      // Simple exact-date filter (used by ?date= and by current Sunday redirect)
      if (options?.date) {
        const rows = (await sql`
          SELECT * FROM meetings
          WHERE date = ${options.date}
          ORDER BY date DESC
        `) as DatabaseRow[];

        const mapped = rows.map(mapRowToMeeting);
        return { meetings: mapped, totalCount: mapped.length };
      }

      const queryTerm = options?.query?.trim().toLowerCase() || '';
      const page = Math.max(1, options?.page || 1);
      const pageSize = options?.pageSize || 5;
      const offset = (page - 1) * pageSize;

      if (queryTerm) {
        const searchPattern = `%${queryTerm}%`;

        // Search presiding, conducting, meeting_type, or text inside speakers JSONB
        const countResult = (await sql`
          SELECT COUNT(*)::int as count
          FROM meetings
          WHERE
            LOWER(presiding) LIKE ${searchPattern}
            OR LOWER(conducting) LIKE ${searchPattern}
            OR LOWER(meeting_type) LIKE ${searchPattern}
            OR LOWER(speakers::text) LIKE ${searchPattern}
        `) as { count: number }[];

        const totalCount = countResult[0]?.count ?? 0;

        const rows = (await sql`
          SELECT *
          FROM meetings
          WHERE
            LOWER(presiding) LIKE ${searchPattern}
            OR LOWER(conducting) LIKE ${searchPattern}
            OR LOWER(meeting_type) LIKE ${searchPattern}
            OR LOWER(speakers::text) LIKE ${searchPattern}
          ORDER BY date DESC
          LIMIT ${pageSize} OFFSET ${offset}
        `) as DatabaseRow[];

        return { meetings: rows.map(mapRowToMeeting), totalCount };
      }

      // No query term: paginated select
      const countResult = (await sql`
        SELECT COUNT(*)::int as count FROM meetings
      `) as { count: number }[];

      const totalCount = countResult[0]?.count ?? 0;

      const rows = (await sql`
        SELECT *
        FROM meetings
        ORDER BY date DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `) as DatabaseRow[];

      return { meetings: rows.map(mapRowToMeeting), totalCount };
    } catch (error) {
      console.error('Database query error, falling back to local memory store:', error);
    }
  }

  // Fallback in-memory behavior
  let results = [...fallbackMeetings];

  if (options?.date) {
    results = results.filter((m) => m.date === options.date);
    return { meetings: results, totalCount: results.length };
  }

  const queryTerm = options?.query?.trim().toLowerCase() || '';
  if (queryTerm) {
    results = results.filter((m) => {
      const matchPresiding = m.presiding.toLowerCase().includes(queryTerm);
      const matchConducting = m.conducting.toLowerCase().includes(queryTerm);
      const matchType = m.meetingType.toLowerCase().includes(queryTerm);
      const matchSpeakers = m.speakers.some(
        (s) =>
          s.name.toLowerCase().includes(queryTerm) ||
          s.topic.toLowerCase().includes(queryTerm)
      );
      return matchPresiding || matchConducting || matchType || matchSpeakers;
    });
  }

  const totalCount = results.length;
  const page = Math.max(1, options?.page || 1);
  const pageSize = options?.pageSize || 5;
  const offset = (page - 1) * pageSize;

  const paginated = results.slice(offset, offset + pageSize);
  return { meetings: paginated, totalCount };
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    try {
      const sql = neon(databaseUrl);
      const rows = (await sql`
        SELECT * FROM meetings WHERE id = ${id} LIMIT 1
      `) as DatabaseRow[];

      if (rows.length > 0) {
        return mapRowToMeeting(rows[0]);
      }
      return null;
    } catch (error) {
      console.error(`Database query error for meeting ${id}:`, error);
    }
  }

  return fallbackMeetings.find((m) => m.id === id) ?? null;
}

// Week 04 stubs for mutations (signatures preserved)
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function addMeeting(_meeting: Omit<SacramentMeeting, 'id'>): Promise<SacramentMeeting> {
  throw new Error('addMeeting will be implemented in Week 04');
}

export async function updateMeeting(_id: number, _meeting: Partial<SacramentMeeting>): Promise<SacramentMeeting | null> {
  throw new Error('updateMeeting will be implemented in Week 04');
}

export async function deleteMeeting(_id: number): Promise<boolean> {
  throw new Error('deleteMeeting will be implemented in Week 04');
}
/* eslint-enable @typescript-eslint/no-unused-vars */
