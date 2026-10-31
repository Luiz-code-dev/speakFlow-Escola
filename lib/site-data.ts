export const SITE_URL = 'https://speakflowescola.com.br'
export const CODEVELOP_URL = 'https://codevelop.com.br'
export const CONTACT_EMAIL = 'luiz.melo@cdsolutions.com.br'
export const FAMILY_LOGIN_URL = 'https://www.speakflow.ia.br/escola/familia/entrar'

export const GOOGLE_PLAY_URL = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim() || ''
export const FAMILY_ENABLED = process.env.NEXT_PUBLIC_FAMILY_ENABLED === 'true'

export const STUDENT_LOGIN_URL =
  process.env.NEXT_PUBLIC_STUDENT_LOGIN_URL?.trim() || 'https://www.speakflow.ia.br/escola/aluno/entrar'
export const SCHOOL_LOGIN_URL =
  process.env.NEXT_PUBLIC_SCHOOL_LOGIN_URL?.trim() || 'https://www.speakflow.ia.br/escola/entrar'

export const LOGIN_LINKS = [
  { label: 'Aluno', description: 'Cartão de figuras, PIN ou código da aula', href: STUDENT_LOGIN_URL },
  ...(FAMILY_ENABLED
    ? [{ label: 'Família', description: 'Acompanhe seus filhos', href: FAMILY_LOGIN_URL }]
    : []),
  { label: 'Escola', description: 'Professores, coordenação, direção e Secretaria', href: SCHOOL_LOGIN_URL },
]

export const NAV_ITEMS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Para alunos', href: '#alunos' },
  { label: 'Para famílias', href: '#familias' },
  { label: 'Para escolas e redes', href: '#escolas' },
  { label: 'Segurança', href: '#seguranca' },
]

export const SUBJECTS = [
  { label: 'Língua Portuguesa', color: '#BE185D' },
  { label: 'Matemática', color: '#1D4ED8' },
  { label: 'Inglês', color: '#6D28D9' },
  { label: 'Ciências', color: '#0F766E' },
  { label: 'História', color: '#C2410C' },
  { label: 'Geografia', color: '#15803D' },
]

export type Level = 'Ainda não' | 'Quase lá' | 'Domina'

export const PROBLEM_STATS = [
  {
    value: 35.9,
    decimals: 1,
    suffix: '%',
    text: 'dos alunos do 9º ano têm aprendizado adequado em Língua Portuguesa.',
    source: 'Saeb 2023, análise Todos Pela Educação',
  },
  {
    value: 16.5,
    decimals: 1,
    suffix: '%',
    text: 'dos alunos do 9º ano têm aprendizado adequado em Matemática.',
    source: 'Saeb 2023, análise Todos Pela Educação',
  },
  {
    value: 75,
    decimals: 0,
    suffix: 'ª',
    text: 'posição do Brasil entre 123 países em proficiência em inglês.',
    source: 'EF EPI 2025',
  },
]

export const PATH_STEPS = [
  {
    title: 'Diagnóstico',
    text: 'Perguntas curtas por habilidade da BNCC. Cada erro revela o que o aluno pensou.',
  },
  {
    title: 'Degrau',
    text: 'Se precisa, volta ao pré-requisito de anos anteriores e acha onde a lacuna começa.',
  },
  {
    title: 'Trilha automática',
    text: 'Começa pela habilidade mais básica que falta. O professor pode ajustar.',
  },
  {
    title: 'Prática em casa',
    text: 'Relembrar, exemplo, praticar, aplicar e explicar, por texto, voz ou quiz, em sessões de 10 a 15 minutos.',
  },
  {
    title: 'Retorno da IA na hora',
    text: 'O que acertou, o erro e o porquê, e um exemplo. Pode tentar de novo.',
  },
  {
    title: 'Evolução sem nota',
    text: 'Ainda não, Quase lá, Domina. A família e a escola acompanham.',
  },
]

export const STAIRS = [
  { grade: '4º ano', skill: 'Frações equivalentes' },
  { grade: '5º ano', skill: 'Soma de frações' },
  { grade: '6º ano', skill: 'Problemas com frações' },
]

export type DemoCase = {
  id: string
  tab: string
  meta: string
  skill: string
  prompt: string
  kind: 'text' | 'voice' | 'pictures'
  answer: string
  pictures?: { label: string; icon: 'banana' | 'cat' | 'sun' | 'house'; chosen?: boolean }[]
  feedback: { right: string; improve: string; example: string }
  level: Level
}

export const DEMO_CASES: DemoCase[] = [
  {
    id: 'matematica',
    tab: 'Matemática',
    meta: '6º ano · raciocínio',
    skill: 'Calcular a fração de uma quantidade em um problema.',
    prompt: 'Uma turma tem 32 alunos e 3/4 deles vêm de ônibus. Quantos alunos vêm de ônibus? Explique como pensou.',
    kind: 'text',
    answer: 'Dividi 32 por 4 e deu 8. Depois fiz 8 vezes 3 e deu 24 alunos.',
    feedback: {
      right: 'Resposta certa: 24 alunos. Você dividiu o todo em 4 partes iguais e pegou 3 delas.',
      improve:
        'Erro comum que você evitou: fazer só 32 vezes 3 e esquecer de dividir. Para a explicação ficar completa, diga por que dividiu por 4: o denominador mostra em quantas partes iguais a turma foi dividida.',
      example: '3/4 de 20 alunos: 20 ÷ 4 = 5 alunos em cada parte, e 5 × 3 = 15 alunos.',
    },
    level: 'Domina',
  },
  {
    id: 'portugues',
    tab: 'Português',
    meta: '9º ano · escrita',
    skill: 'Defender uma opinião com argumentos e cuidar da concordância.',
    prompt: 'Escreva um parágrafo de opinião: o seu bairro precisa de mais áreas de lazer?',
    kind: 'text',
    answer:
      'Sim, meu bairro precisa de mais áreas de lazer porque os jovens não tem onde praticar esportes e acabam ficando sem ter o que fazer.',
    feedback: {
      right: 'Você deixou a opinião clara logo na primeira frase e apresentou um motivo.',
      improve:
        'Erro comum de concordância: com "os jovens" (plural), o verbo é "têm", com acento. Fortaleça o texto com um segundo argumento ou um exemplo do bairro.',
      example:
        'Sim, meu bairro precisa de mais áreas de lazer, porque os jovens não têm onde praticar esportes. Uma quadra na praça, por exemplo, reuniria a comunidade.',
    },
    level: 'Quase lá',
  },
  {
    id: 'ingles',
    tab: 'Inglês',
    meta: '7º ano · fala',
    skill: 'Falar sobre a própria rotina ligando as ideias.',
    prompt: 'Talk about your daily routine in English.',
    kind: 'voice',
    answer: 'I wake up at six o’clock. I go to school by bus. In the afternoon I play football with my friends.',
    feedback: {
      right: 'Frases completas, na ordem do dia, com horário e meio de transporte. Pronúncia clara.',
      improve:
        'Erro comum: frases soltas, sem ligação entre elas. Use conectivos como "then" e "after that" para encadear a rotina.',
      example: 'I wake up at six o’clock, then I go to school by bus. After that, I play football with my friends.',
    },
    level: 'Quase lá',
  },
  {
    id: 'alfabetizacao',
    tab: 'Alfabetização',
    meta: '1º ano · voz',
    skill: 'Reconhecer o som do começo das palavras.',
    prompt: 'Toque na figura que começa com o mesmo som de BOLA.',
    kind: 'pictures',
    answer: 'A criança tocou em BANANA.',
    pictures: [
      { label: 'Gato', icon: 'cat' },
      { label: 'Banana', icon: 'banana', chosen: true },
      { label: 'Sol', icon: 'sun' },
      { label: 'Casa', icon: 'house' },
    ],
    feedback: {
      right: 'Isso! BA-NA-NA começa com o mesmo som de BO-LA.',
      improve:
        'Erro comum: escolher pela figura de que mais gosta, e não pelo som. Fale as palavras devagar e escute o primeiro pedacinho.',
      example: 'Outras palavras com esse som: BOTA, BOLO, BARCO.',
    },
    level: 'Domina',
  },
]

export const STUDENT_CARDS = [
  {
    icon: 'key',
    title: 'Entrar é fácil',
    text: 'Do 1º ao 5º ano, você entra tocando nas figuras do seu cartão. Do 6º em diante, com um PIN de 4 números. Ou com o código da aula. Sem e-mail.',
  },
  { icon: 'mic', title: 'Fala, escreve ou resolve', text: 'Responda do jeito que preferir, até por áudio.' },
  { icon: 'retry', title: 'Errar faz parte', text: 'A IA explica e você tenta de novo, sem ninguém olhando.' },
  {
    icon: 'level',
    title: 'Veja você subir de nível',
    text: 'Cada habilidade vira "Domina" quando você pega o jeito.',
  },
  { icon: 'audio', title: 'Ouça a instrução', text: 'Para quem ainda está aprendendo a ler, o app lê em voz alta.' },
] as const

export const FAMILY_ITEMS = [
  'O que ele está praticando, em linguagem simples: "Ana está praticando: Frações".',
  'Os dias em que praticou.',
  'A evolução por habilidade.',
  'Uma dica curta de como ajudar em casa.',
  'Aviso depois de 7 dias sem praticar.',
  'Todos os filhos num só acesso.',
  'Contato da escola.',
]

export const FAMILY_ONBOARDING = [
  'A escola cadastra a família.',
  'A família recebe o convite por e-mail ou WhatsApp, ou usa o código do cartão do aluno.',
  'Cria a senha e já acompanha.',
]

export const ROLE_TABS = [
  {
    id: 'secretaria',
    label: 'Secretaria',
    title: 'A rede inteira, por habilidade.',
    items: [
      'Habilidades recuperadas por escola.',
      'Participação semanal.',
      'Defasagens da BNCC na rede.',
      'Evolução entre diagnósticos.',
      'Relatórios em PDF e planilha para a política de recomposição.',
    ],
  },
  {
    id: 'coordenacao',
    label: 'Coordenação',
    title: 'O pedagógico pronto para começar.',
    items: [
      'Diagnósticos prontos por ano e componente.',
      'Habilidades prioritárias por unidade temática.',
      'Aprovação de trilhas.',
    ],
  },
  {
    id: 'direcao',
    label: 'Direção',
    title: 'A escola funcionando, sem planilha paralela.',
    items: [
      'Cadastro por planilha.',
      'Cartões de acesso.',
      'Quem não está praticando.',
      'Participação das famílias.',
    ],
  },
  {
    id: 'professor',
    label: 'Professor',
    title: 'A turma inteira num só mapa.',
    items: [
      'Mapa da turma em cores.',
      'Ficha de cada aluno com os erros comuns.',
      'Sugestões de trilha prontas para aceitar.',
      'A IA corrige e o professor decide.',
    ],
  },
] as const

export const CLASS_SKILLS = ['Frações equivalentes', 'Soma de frações', 'Problemas com frações', 'Porcentagem']

export const CLASS_MAP: { name: string; levels: Level[] }[] = [
  { name: 'Ana B.', levels: ['Domina', 'Domina', 'Quase lá', 'Quase lá'] },
  { name: 'Bruno C.', levels: ['Domina', 'Quase lá', 'Quase lá', 'Ainda não'] },
  { name: 'Carla D.', levels: ['Domina', 'Domina', 'Domina', 'Quase lá'] },
  { name: 'Davi E.', levels: ['Ainda não', 'Ainda não', 'Ainda não', 'Ainda não'] },
  { name: 'Elisa F.', levels: ['Domina', 'Quase lá', 'Ainda não', 'Quase lá'] },
  { name: 'Fábio G.', levels: ['Quase lá', 'Quase lá', 'Ainda não', 'Ainda não'] },
]

export const CLASS_ACTIVITY_STEPS = [
  { title: 'Foto do quadro', text: 'O professor tira uma foto do quadro ou escolhe as habilidades da aula.' },
  { title: 'Perguntas sugeridas', text: 'A IA sugere perguntas, e o professor revisa e publica.' },
  {
    title: 'Quanto a turma absorveu',
    text: 'Vê o resultado por objetivo, e quem precisa vai para o reforço com um toque.',
  },
]

export const SAFETY_ITEMS = [
  { title: 'Sem distrações', text: 'Sem rede social, sem chat entre alunos, sem anúncios.' },
  { title: 'A IA não sabe quem é o aluno', text: 'Recebe só a resposta, nunca o nome ou a matrícula.' },
  { title: 'Dados isolados', text: 'As informações de cada rede de ensino ficam separadas.' },
  { title: 'Família vê só os seus', text: 'Cada responsável acessa apenas os próprios filhos.' },
]

export const LAWS = ['LGPD', 'ECA Digital (Lei 15.211/2025)', 'Lei 15.100/2025 (uso pedagógico do celular)']

export const FAQ = [
  { q: 'A IA substitui o professor?', a: 'Não. Ela corrige e explica; o professor acompanha e decide.' },
  {
    q: 'Isso substitui as notas da escola?',
    a: 'Não. É reforço e recomposição; as notas oficiais continuam no sistema da rede.',
  },
  {
    q: 'Funciona para os pequenos?',
    a: 'Sim. Do 1º ao 5º ano, a criança entra por figuras e o app lê as instruções em voz alta.',
  },
  {
    q: 'O aluno precisa de celular ou e-mail próprio?',
    a: 'Não. Usa o aparelho da família, com o cartão de acesso.',
  },
  {
    q: 'E quem não tem internet em casa?',
    a: 'A escola pode reservar horários no laboratório, e o painel mostra quem não está praticando.',
  },
  {
    q: 'Quais componentes?',
    a: 'Todos os da BNCC; o pacote inicial começa por Matemática e Língua Portuguesa.',
  },
  {
    q: 'Mais de uma pessoa da família pode acompanhar?',
    a: 'Sim, cada uma com o próprio acesso.',
  },
  {
    q: 'E os dados dos alunos?',
    a: 'Isolados por rede, sem anúncios; a IA nunca recebe nome nem matrícula.',
  },
]
