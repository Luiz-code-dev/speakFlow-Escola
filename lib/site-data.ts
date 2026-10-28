export const SITE_URL = 'https://speakflowescola.com.br'
export const CODEVELOP_URL = 'https://codevelop.com.br'
export const CONTACT_EMAIL = 'luiz.melo@cdsolutions.com.br'
export const FAMILY_LOGIN_URL = 'https://www.speakflow.ia.br/escola/familia/entrar'

export const GOOGLE_PLAY_URL = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim() || ''
export const FAMILY_ENABLED = process.env.NEXT_PUBLIC_FAMILY_ENABLED === 'true'

export const NAV_ITEMS = [
  { href: '#inicio', label: 'Início' },
  { href: '#necessidade', label: 'A necessidade' },
  { href: '#linha-do-tempo', label: 'Linha do tempo' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#demonstracao', label: 'Demonstração' },
  { href: '#reforco-em-casa', label: 'Reforço em casa' },
  { href: '#familia', label: 'Família' },
  { href: '#papeis', label: 'Para cada papel' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#semana-do-aluno', label: 'Semana do aluno' },
  { href: '#contato', label: 'Contato' },
] as const

export const SUBJECTS = [
  { label: 'Língua Portuguesa', color: 'var(--color-subject-pt)' },
  { label: 'Matemática', color: 'var(--color-subject-ma)' },
  { label: 'Inglês', color: 'var(--color-subject-en)' },
  { label: 'Ciências', color: 'var(--color-subject-ci)' },
  { label: 'História', color: 'var(--color-subject-hi)' },
  { label: 'Geografia', color: 'var(--color-subject-ge)' },
  { label: 'Espanhol', color: 'var(--color-subject-es)' },
] as const

export const NEED_STATS = [
  {
    value: 35.9,
    decimals: 1,
    suffix: '%',
    text: 'dos alunos do 9º ano têm aprendizado adequado em Língua Portuguesa.',
    source: 'Saeb 2023, Todos Pela Educação',
    color: 'var(--color-subject-pt)',
  },
  {
    value: 16.5,
    decimals: 1,
    suffix: '%',
    text: 'dos alunos do 9º ano têm aprendizado adequado em Matemática.',
    source: 'Saeb 2023, Todos Pela Educação',
    color: 'var(--color-subject-ma)',
  },
  {
    value: 75,
    decimals: 0,
    suffix: 'º',
    text: 'posição do Brasil entre 123 países em proficiência em inglês, nível baixo.',
    source: 'EF EPI 2025',
    color: 'var(--color-subject-en)',
  },
] as const

export const NEED_REASONS = [
  {
    icon: 'bus',
    title: 'Depende de sala, horário e transporte',
    text: 'O reforço no contraturno exige professor, espaço e deslocamento do aluno, e por isso atende poucos.',
  },
  {
    icon: 'feedback',
    title: 'Pouco retorno individual',
    text: 'Com 30 ou mais alunos por turma, o professor não consegue corrigir e comentar cada exercício de cada aluno.',
  },
  {
    icon: 'home',
    title: 'Tarefa de casa sem apoio',
    text: 'Em casa, o aluno erra sem saber por quê, e nem toda família consegue ajudar em todos os conteúdos.',
  },
  {
    icon: 'late',
    title: 'Defasagem que só aparece no fim',
    text: 'A Secretaria só vê o resultado nas avaliações externas, quando já não dá para corrigir o rumo do ano.',
  },
] as const

export type TimelineItem = { year: string; title: string; text: string; highlight?: boolean }

export const TIMELINE: TimelineItem[] = [
  {
    year: '1930',
    title: 'Nasce o Ministério da Educação',
    text: 'É criado o Ministério da Educação e Saúde Pública. A educação passa a ser tratada como política nacional.',
  },
  {
    year: '1932',
    title: 'Manifesto dos Pioneiros',
    text: 'Educadores defendem uma escola pública, gratuita, laica e para todos: a base do que viria a ser o ensino público brasileiro.',
  },
  {
    year: '1961',
    title: 'A primeira LDB',
    text: 'A Lei de Diretrizes e Bases (Lei 4.024/1961) organiza pela primeira vez o sistema educacional do país.',
  },
  {
    year: '1963',
    title: 'Paulo Freire em Angicos',
    text: 'No Rio Grande do Norte, adultos aprendem a ler e escrever a partir da própria realidade: uma referência mundial em alfabetização.',
  },
  {
    year: '1971',
    title: 'Ensino de 1º e 2º graus',
    text: 'A Lei 5.692/1971 reorganiza a escola e amplia a escolaridade obrigatória para oito anos.',
  },
  {
    year: '1988',
    title: 'Educação como direito',
    text: 'A Constituição Federal define a educação como direito de todos e dever do Estado e da família.',
  },
  {
    year: '1990',
    title: 'Estatuto da Criança e do Adolescente',
    text: 'O ECA garante a proteção integral de crianças e adolescentes, incluindo o direito à educação.',
  },
  {
    year: '1996',
    title: 'A LDB atual',
    text: 'A Lei 9.394/1996 estrutura a educação básica como a conhecemos, e nasce o Fundef para financiar o ensino fundamental.',
  },
  {
    year: '2006',
    title: 'Fundamental de nove anos',
    text: 'O ensino fundamental passa a ter nove anos, com entrada aos seis anos de idade.',
  },
  {
    year: '2007',
    title: 'Ideb e Fundeb',
    text: 'O país passa a medir a qualidade das escolas com o Ideb, e o Fundeb amplia o financiamento a toda a educação básica.',
  },
  {
    year: '2017',
    title: 'BNCC',
    text: 'A Base Nacional Comum Curricular define o que todo aluno deve aprender, em todas as redes do país.',
  },
  {
    year: '2020',
    title: 'A pandemia e a escola em casa',
    text: 'O ensino remoto expõe a desigualdade de acesso e acelera o uso de tecnologia nas redes. O Fundeb se torna permanente.',
  },
  {
    year: '2022',
    title: 'Computação na Educação Básica',
    text: 'A computação passa a integrar o currículo como complemento à BNCC.',
  },
  {
    year: '2023',
    title: 'Política Nacional de Educação Digital',
    text: 'A Lei 14.533/2023 leva a educação digital a todos os níveis e modalidades de ensino.',
  },
  {
    year: '2025',
    title: 'Tecnologia com propósito e proteção',
    text: 'A Lei 15.100/2025 restringe o celular na escola ao uso pedagógico, e o ECA Digital (Lei 15.211/2025) cria regras para proteger crianças no ambiente digital.',
  },
  {
    year: '2025',
    title: 'Pacto pela Recomposição das Aprendizagens',
    text: 'O Decreto 12.391/2025 institui o Pacto Nacional pela Recomposição das Aprendizagens: as redes que aderem fazem o diagnóstico das defasagens e organizam práticas para superá-las.',
  },
  {
    year: '2026',
    title: 'O próximo passo: SpeakFlow Escolas',
    text: 'Reforço escolar com inteligência artificial: cada aluno pratica em casa no que precisa, recebe retorno na hora e evolui; a escola acompanha quem precisa de ajuda durante o ano.',
    highlight: true,
  },
]

export const STORIES = [
  {
    title: 'A aluna que destravou as frações',
    text: 'No 6º ano, ela errava as frações e não sabia por quê. Com a trilha de reforço, praticou em casa 15 minutos por dia, viu a explicação de cada erro e, em poucas semanas, saiu da lista de quem precisava de ajuda.',
    image: '/images/story-fracoes.png',
    alt: 'Ilustração de um celular sobre a mesa de casa mostrando um círculo dividido em quatro partes, com três destacadas.',
  },
  {
    title: 'O menino que perdeu o medo de falar inglês',
    text: 'Gravando respostas no celular, em casa, sem a turma olhando, ele treinou a pronúncia até se sentir seguro para falar na aula.',
    image: '/images/story-voz.png',
    alt: 'Ilustração de um aparelho com microfone e balões de fala saindo da tela.',
  },
  {
    title: 'A professora que sabe por onde começar',
    text: 'Antes da aula, ela abre o painel e vê quem praticou, quem avançou e quais habilidades ainda travam a turma. O tempo da aula vai para onde faz diferença.',
    image: '/images/story-coordenacao.png',
    alt: 'Ilustração de um painel com gráficos e cartões de habilidades conectados, com uma lupa em destaque.',
  },
  {
    title: 'A Secretaria que recompõe a aprendizagem',
    text: 'Com o diagnóstico e as trilhas em toda a rede, a Secretaria acompanha durante o ano quais habilidades da BNCC estão sendo recuperadas em cada escola.',
    image: '/images/story-rede.png',
    alt: 'Ilustração de um painel com um mapa de escolas conectadas, cada uma com um anel de progresso.',
  },
] as const

export type Mastery = 'Ainda não' | 'Quase lá' | 'Domina'

export type DemoCase = {
  id: 'en' | 'pt' | 'ma'
  tab: string
  subject: string
  grade: string
  mode: 'speech' | 'writing' | 'reasoning'
  color: string
  skill: string
  prompt: string
  answer: string
  hits: string[]
  improve: string[]
  example: string
  mastery: Mastery
}

export const DEMO_CASES: DemoCase[] = [
  {
    id: 'en',
    tab: 'Inglês (fala)',
    subject: 'Inglês',
    grade: '7º ano',
    mode: 'speech',
    color: 'var(--color-subject-en)',
    skill: 'Falar sobre a rotina (presente simples)',
    prompt: 'Talk about your daily routine in English (about 30 seconds).',
    answer:
      'I wake up at six o\u2019clock. I go to school by bus. In the afternoon I play football with my friends.',
    hits: ['Frases completas e na ordem certa do dia', 'Bom uso de horários e meios de transporte'],
    improve: [
      'Ligue as ideias com palavras como *then* e *after that*',
      'Tente acrescentar uma frase sobre o que você gosta na sua rotina',
    ],
    example:
      'I wake up at six o\u2019clock, then I go to school by bus. After school, I play football with my friends because it\u2019s fun.',
    mastery: 'Quase lá',
  },
  {
    id: 'pt',
    tab: 'Português (escrita)',
    subject: 'Língua Portuguesa',
    grade: '9º ano',
    mode: 'writing',
    color: 'var(--color-subject-pt)',
    skill: 'Argumentação em texto de opinião',
    prompt: 'Escreva um parágrafo de opinião: o seu bairro precisa de mais áreas de lazer?',
    answer:
      'Sim, meu bairro precisa de mais áreas de lazer porque os jovens não tem onde praticar esportes e acabam ficando na rua sem fazer nada.',
    hits: ['Opinião clara logo na primeira frase', 'Apresenta um motivo para defender a ideia'],
    improve: [
      'Concordância: *os jovens não têm* (com acento)',
      'Inclua um segundo argumento ou um exemplo do seu bairro',
    ],
    example:
      'Sim, meu bairro precisa de mais áreas de lazer, porque os jovens não têm onde praticar esportes. Uma quadra na praça central, por exemplo, poderia reunir a comunidade.',
    mastery: 'Quase lá',
  },
  {
    id: 'ma',
    tab: 'Matemática (raciocínio)',
    subject: 'Matemática',
    grade: '6º ano',
    mode: 'reasoning',
    color: 'var(--color-subject-ma)',
    skill: 'Frações: parte de um todo',
    prompt:
      'Uma turma tem 32 alunos. 3/4 vieram de ônibus. Quantos alunos vieram de ônibus? Explique como pensou.',
    answer: 'Dividi 32 por 4 e deu 8. Depois multipliquei 8 por 3 e deu 24 alunos.',
    hits: ['Raciocínio correto: encontrou 1/4 e depois 3/4', 'Resultado certo: 24 alunos'],
    improve: ['Explique por que dividiu por 4 (o denominador indica as partes)'],
    example:
      'Como 3/4 significa 3 de 4 partes iguais, dividi 32 por 4 (8 alunos em cada parte) e multipliquei por 3: 24 alunos vieram de ônibus.',
    mastery: 'Domina',
  },
]

export const ROLES = [
  {
    id: 'secretaria',
    label: 'Secretaria',
    summary: 'A rede inteira em recomposição, acompanhada durante o ano.',
    connection: 'Define as prioridades da rede',
    groups: [
      {
        icon: 'network',
        title: 'Organização',
        items: [
          'Escolas, turmas e alunos por planilha',
          'Ano letivo e períodos',
          'Prioridades do reforço por etapa e componente',
        ],
      },
      {
        icon: 'chart',
        title: 'Acompanhamento',
        items: [
          'Participação semanal por escola',
          'Habilidades da BNCC em defasagem e recuperadas',
          'Evolução entre diagnósticos',
          'Famílias acompanhando, por escola',
        ],
      },
      {
        icon: 'clipboard',
        title: 'Prestação de contas',
        items: ['Relatórios para a política de recomposição da rede', 'Exportação em PDF e planilha'],
      },
    ],
  },
  {
    id: 'coordenacao',
    label: 'Coordenação pedagógica',
    summary: 'Prioridades do reforço alinhadas à BNCC.',
    connection: 'Aprova as trilhas',
    groups: [
      {
        icon: 'target',
        title: 'Diagnóstico',
        items: ['Aplica e acompanha o diagnóstico por ano e componente'],
      },
      {
        icon: 'route',
        title: 'Trilhas',
        items: ['Define habilidades prioritárias e aprova as trilhas das escolas'],
      },
      {
        icon: 'chart',
        title: 'Acompanhamento',
        items: ['Escolas e turmas que precisam de mais apoio'],
      },
    ],
  },
  {
    id: 'direcao',
    label: 'Direção escolar',
    summary: 'Reforço chegando a todos os alunos da escola.',
    connection: 'Entrega os cartões às famílias',
    groups: [
      {
        icon: 'sheet',
        title: 'Cadastro e acesso',
        items: [
          'Cadastro de turmas e alunos por planilha',
          'Cartões de acesso para levar para casa',
          'Comunicação com as famílias',
          'Famílias: quem já acompanha, convites pendentes e novo código de família',
        ],
      },
      {
        icon: 'users',
        title: 'Quem precisa de apoio',
        items: ['Alunos que não estão praticando', 'Horários de laboratório para quem não tem aparelho'],
      },
    ],
  },
  {
    id: 'professor',
    label: 'Professor',
    summary: 'A IA corrige o reforço. O professor sabe por onde começar.',
    connection: 'Indica as trilhas e acompanha',
    groups: [
      {
        icon: 'sparkles',
        title: 'Reforço da turma',
        items: [
          'Indica trilhas para a turma ou para cada aluno',
          'Vê quem praticou, quem avançou e quem travou',
          'Revisa os retornos da IA quando quiser',
          'Usa o painel para planejar a próxima aula',
        ],
      },
    ],
  },
  {
    id: 'aluno',
    label: 'Aluno',
    summary: 'Pratica no que precisa e vê a própria evolução.',
    connection: 'Pratica em casa',
    groups: [
      {
        icon: 'list',
        title: 'Na trilha',
        items: [
          'Entra com cartão QR, matrícula e PIN',
          'Trilha com o próximo passo',
          'Retorno imediato e nova tentativa',
          'Evolução por componente, sem comparar com colegas',
        ],
      },
    ],
  },
  {
    id: 'familia',
    label: 'Família',
    summary: 'Acompanha a evolução de cada filho e sabe como ajudar em casa.',
    connection: 'Recebe o acesso pela escola · Acompanha o que o aluno pratica',
    groups: [
      {
        icon: 'key',
        title: 'Acesso',
        items: [
          'Login próprio, separado do aluno',
          'Um login para todos os filhos',
          'Entrada por convite ou código de família',
        ],
      },
      {
        icon: 'chart',
        title: 'Acompanhamento',
        items: ['Semana do filho', 'Trilha atual', 'Evolução por habilidade', 'Últimos retornos da IA'],
      },
      {
        icon: 'lightbulb',
        title: 'Apoio',
        items: [
          'Dica de como ajudar',
          'Aviso de 7 dias sem praticar',
          'Resumo semanal por e-mail',
          'Contato da escola',
        ],
      },
    ],
  },
] as const

export type RoleId = (typeof ROLES)[number]['id']

export const FAQ = [
  {
    q: 'Só serve para Português e Matemática?',
    a: 'Não. O motor é o mesmo para todos os componentes da BNCC: Português, Matemática, Inglês, Ciências, História, Geografia, Espanhol e outros.',
  },
  {
    q: 'O aluno precisa de e-mail ou celular próprio?',
    a: 'Não. Ele entra com o cartão QR ou com matrícula e PIN, no aparelho que a família tiver.',
  },
  {
    q: 'E quem não tem internet em casa?',
    a: 'A escola pode reservar horários no laboratório ou na biblioteca, e a rede pode fornecer tablets com chip de dados. O painel mostra quem não está praticando.',
  },
  {
    q: 'A IA substitui o professor?',
    a: 'Não. A IA corrige e explica cada atividade do reforço; o professor indica as trilhas, acompanha e decide como ajudar cada aluno.',
  },
  {
    q: 'Isso substitui as notas da escola?',
    a: 'Não. O SpeakFlow Escolas é para reforço e recomposição da aprendizagem. As notas oficiais continuam no sistema da rede.',
  },
  {
    q: 'Os pais conseguem acompanhar?',
    a: 'Sim. Pais e responsáveis têm um acesso próprio, separado do aluno, para ver a semana, a trilha e a evolução do filho, com dicas de como ajudar em casa.',
  },
  {
    q: 'Tenho mais de um filho na rede. Preciso de vários logins?',
    a: 'Não. Com um único login você acompanha todos os seus filhos, mesmo que estudem em escolas diferentes da rede.',
  },
  {
    q: 'Mais de uma pessoa da família pode acompanhar o mesmo aluno?',
    a: 'Sim. Mãe, pai, avós ou tutor podem ter cada um o seu acesso, cadastrados pela escola.',
  },
  {
    q: 'E se a família não tiver e-mail?',
    a: 'O acesso pode ser feito com o código de família impresso no cartão do aluno e a data de nascimento dele.',
  },
  {
    q: 'E os dados dos alunos?',
    a: 'Ficam isolados por município, sem rede social nem anúncios. A IA recebe só a resposta, sem nome nem matrícula.',
  },
] as const
