import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bispo Tony',
    conducting: 'Irmão Galvão',
    openingHymn: { number: 4, title: 'No Monte a Bandeira' },
    openingPrayer: 'Irmã Luciana Galvão',
    wardBusiness: [{ description: 'None' }],
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
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
