export const SITE_URL = 'https://speakflowescola.com.br'
export const CODEVELOP_URL = 'https://codevelop.com.br'
export const CONTACT_EMAIL = 'luiz.melo@cdsolutions.com.br'

export const NAV_ITEMS = [
  { href: '#inicio', label: 'Início' },
  { href: '#necessidade', label: 'A necessidade' },
  { href: '#linha-do-tempo', label: 'Linha do tempo' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#demonstracao', label: 'Demonstração' },
  { href: '#papeis', label: 'Para cada papel' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#implantacao', label: 'Implantação' },
  { href: '#contato', label: 'Contato' },
] as const

export const SUBJECTS = [
  { label: 'Inglês', color: 'var(--color-subject-en)' },
  { label: 'Língua Portuguesa', color: 'var(--color-subject-pt)' },
  { label: 'Matemática', color: 'var(--color-subject-ma)' },
  { label: 'Ciências', color: 'var(--color-subject-ci)' },
  { label: 'História', color: 'var(--color-subject-hi)' },
  { label: 'Geografia', color: 'var(--color-subject-ge)' },
  { label: 'Arte', color: 'var(--color-subject-ar)' },
  { label: 'Educação Física', color: 'var(--color-subject-ef)' },
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
    year: '2026',
    title: 'O próximo passo: SpeakFlow Escolas',
    text: 'Inteligência artificial a serviço do professor: cada aluno pratica, recebe retorno na hora e evolui; cada nota fica protegida; a rede acompanha a aprendizagem durante o ano.',
    highlight: true,
  },
]

export const STORIES = [
  {
    title: 'A aluna que ganhou voz em inglês',
    text: 'No 7º ano, ela tinha vergonha de falar em inglês. Gravando respostas curtas no tablet e recebendo retorno sobre pronúncia e clareza, passou a praticar toda semana, sem medo de errar na frente da turma.',
    image: '/images/story-voz.png',
    alt: 'Ilustração de um tablet com microfone e balões de fala saindo da tela.',
  },
  {
    title: 'O professor que recuperou suas noites',
    text: 'A IA faz a primeira correção dos textos dos alunos e sugere a nota. Ele revisa, ajusta e publica. O tempo que gastava corrigindo vira tempo para planejar e acompanhar quem precisa de ajuda.',
    image: '/images/story-professor.png',
    alt: 'Ilustração de uma mesa de professor com notebook mostrando correções e uma nota sugerida.',
  },
  {
    title: 'A coordenação que enxerga a rede',
    text: 'Com os planos de ensino e as atividades no mesmo lugar, a coordenação vê o que foi ensinado em cada turma e onde os alunos estão com dificuldade, durante o bimestre.',
    image: '/images/story-coordenacao.png',
    alt: 'Ilustração de um painel com gráficos e cartões de turmas conectados.',
  },
  {
    title: 'A Secretaria que presta contas com segurança',
    text: 'Cada ata de notas é assinada digitalmente e pode ser verificada por QR code. A rede ganha transparência e proteção contra fraudes em resultados.',
    image: '/images/story-secretaria.png',
    alt: 'Ilustração de um documento com selo de assinatura digital e QR code sendo verificado por um celular.',
  },
] as const

export type DemoCase = {
  id: 'en' | 'pt' | 'ma'
  tab: string
  subject: string
  grade: string
  mode: 'speech' | 'writing' | 'reasoning'
  color: string
  prompt: string
  answer: string
  hits: string[]
  improve: string[]
  example: string
  score: number
}

export const DEMO_CASES: DemoCase[] = [
  {
    id: 'en',
    tab: 'Inglês (fala)',
    subject: 'Inglês',
    grade: '7º ano',
    mode: 'speech',
    color: 'var(--color-subject-en)',
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
    score: 8,
  },
  {
    id: 'pt',
    tab: 'Português (escrita)',
    subject: 'Língua Portuguesa',
    grade: '9º ano',
    mode: 'writing',
    color: 'var(--color-subject-pt)',
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
    score: 7.5,
  },
  {
    id: 'ma',
    tab: 'Matemática (raciocínio)',
    subject: 'Matemática',
    grade: '6º ano',
    mode: 'reasoning',
    color: 'var(--color-subject-ma)',
    prompt:
      'Uma turma tem 32 alunos. 3/4 vieram de ônibus. Quantos alunos vieram de ônibus? Explique como pensou.',
    answer: 'Dividi 32 por 4 e deu 8. Depois multipliquei 8 por 3 e deu 24 alunos.',
    hits: ['Raciocínio correto: encontrou 1/4 e depois 3/4', 'Resultado certo: 24 alunos'],
    improve: ['Explique por que dividiu por 4 (o denominador indica as partes)'],
    example:
      'Como 3/4 significa 3 de 4 partes iguais, dividi 32 por 4 (8 alunos em cada parte) e multipliquei por 3: 24 alunos vieram de ônibus.',
    score: 9,
  },
]

export const ROLES = [
  {
    id: 'secretaria',
    label: 'Secretaria de Educação',
    summary: 'Visão de toda a rede durante o ano, não só quando chega a avaliação externa.',
    groups: [
      {
        icon: 'network',
        title: 'Organização da rede',
        items: [
          'Cadastro das escolas da rede',
          'Ano letivo e períodos (bimestres ou trimestres)',
          'Regras de notas da rede (escala, arredondamento, média mínima e recuperação)',
          'Convites para diretores e coordenadores',
        ],
      },
      {
        icon: 'grid',
        title: 'Matriz curricular',
        items: [
          'Componentes da BNCC por etapa, ano e turno',
          'Carga horária por componente',
          'Inclusão de componentes da parte diversificada da rede',
        ],
      },
      {
        icon: 'chart',
        title: 'Acompanhamento',
        items: [
          'Indicadores por escola, turma e componente',
          'Atividades realizadas e entregas no período',
          'Diagnóstico de nível no início e ao longo do ano',
          'Alerta de turmas com baixo desempenho',
        ],
      },
      {
        icon: 'shield',
        title: 'Transparência e controle',
        items: [
          'Atas de notas assinadas e verificáveis por QR code',
          'Auditoria de todas as ações',
          'Retificações de notas registradas com justificativa',
          'Relatórios para prestação de contas',
        ],
      },
    ],
    connections: ['Define as regras para todas as escolas', 'Recebe os indicadores das turmas'],
  },
  {
    id: 'coordenacao',
    label: 'Coordenação pedagógica',
    summary: 'Planejamento alinhado à BNCC e acompanhamento do que acontece em cada turma.',
    groups: [
      {
        icon: 'book',
        title: 'Planos de ensino',
        items: [
          'Criação de planos por componente e ano',
          'Unidades e assuntos vinculados às habilidades da BNCC',
          'Revisão e aprovação dos planos dos professores',
          'Reaproveitamento de planos entre turmas e anos',
        ],
      },
      {
        icon: 'users',
        title: 'Acompanhamento dos professores',
        items: [
          'O que foi planejado e o que foi trabalhado',
          'Atividades publicadas por turma',
          'Andamento da correção e das notas',
        ],
      },
      {
        icon: 'clipboard',
        title: 'Avaliações e notas',
        items: [
          'Visão das avaliações de cada período',
          'Decisão sobre pedidos de retificação de notas',
          'Fechamento do período com conferência',
        ],
      },
      {
        icon: 'target',
        title: 'Aprendizagem',
        items: ['Desempenho por critério de avaliação', 'Turmas e assuntos que precisam de reforço'],
      },
    ],
    connections: ['Aprova os planos dos professores', 'Decide as retificações'],
  },
  {
    id: 'direcao',
    label: 'Direção escolar',
    summary: 'A escola organizada em poucos minutos, sem cadastrar ninguém um por um.',
    groups: [
      {
        icon: 'sheet',
        title: 'Cadastro em lote',
        items: [
          'Importação de turmas, alunos e servidores por planilha (inclusive exportada do sistema da rede)',
          'Conferência dos erros antes de confirmar',
          'Convites enviados por e-mail automaticamente',
        ],
      },
      {
        icon: 'grid',
        title: 'Turmas e atribuições',
        items: [
          'Turmas por ano e turno',
          'Quadro de atribuições (professor × componente × turma)',
          'Troca de professor sem perder histórico',
        ],
      },
      {
        icon: 'qr',
        title: 'Acesso dos alunos',
        items: [
          'Cartões de acesso com QR code para imprimir',
          'Acesso por código da aula e matrícula, sem e-mail',
          'Senha por figuras para os anos iniciais',
          'Redefinição de acesso pela própria escola',
        ],
      },
      {
        icon: 'school',
        title: 'Vida escolar',
        items: [
          'Enturmação, transferência e remanejamento',
          'Passagem de ano sem perder histórico',
          'Visão das notas e atividades de todas as turmas da escola',
        ],
      },
    ],
    connections: ['Cadastra turmas e alunos', 'Distribui os cartões de acesso'],
  },
  {
    id: 'professor',
    label: 'Professor',
    summary: 'A IA faz a primeira correção. O professor decide.',
    groups: [
      {
        icon: 'book',
        title: 'Planejamento',
        items: ['Plano de ensino da turma com assuntos da BNCC', 'Atividades ligadas a cada assunto'],
      },
      {
        icon: 'sparkles',
        title: 'Atividades com IA',
        items: [
          'Atividades de escrita, de fala e quiz',
          'Sugestão de enunciado e critérios de avaliação pela IA (o professor edita)',
          'Critérios com pesos definidos pelo professor',
          'Prazo e número de tentativas',
        ],
      },
      {
        icon: 'pen',
        title: 'Correção',
        items: [
          'Primeira correção automática com nota sugerida e comentários',
          'Ouvir a gravação do aluno',
          'Ajustar a nota e comentar',
          'Confirmar várias notas de uma vez, com revisão antes',
        ],
      },
      {
        icon: 'lock',
        title: 'Notas com segurança',
        items: [
          'Planilha de notas por avaliação',
          'Publicação protegida por senha',
          'Nota publicada não pode ser apagada',
          'Retificação só com justificativa e aprovação',
        ],
      },
      {
        icon: 'projector',
        title: 'Sala de aula',
        items: ['Modo sala para projetar no quadro', 'Abrir a aula para os alunos entrarem com o código'],
      },
    ],
    connections: ['Segue o plano aprovado', 'Envia atividades aos alunos', 'Publica as notas'],
  },
  {
    id: 'aluno',
    label: 'Aluno',
    summary: 'Pratica, recebe retorno na hora e acompanha a própria evolução.',
    groups: [
      {
        icon: 'qr',
        title: 'Acesso simples',
        items: [
          'Cartão QR, código da aula ou matrícula',
          'Senha por figuras nos anos iniciais',
          'Funciona em tablet, computador e celular',
        ],
      },
      {
        icon: 'list',
        title: 'Atividades',
        items: [
          'Lista do que fazer, por prazo',
          'Escrita com rascunho salvo automaticamente',
          'Fala com gravação, ouvir antes de enviar e gravar de novo',
          'Quiz com uma pergunta por tela',
        ],
      },
      {
        icon: 'sparkles',
        title: 'Retorno da IA',
        items: [
          'O que acertou, como melhorar e exemplo de resposta',
          'Transcrição da própria fala',
          'Nova tentativa quando o professor permite',
        ],
      },
      {
        icon: 'chart',
        title: 'Notas e evolução',
        items: ['Notas publicadas pelo professor', 'Evolução por componente, sem comparação com colegas'],
      },
      {
        icon: 'shield',
        title: 'Ambiente protegido',
        items: ['Sem rede social, chat, anúncios ou ranking entre colegas'],
      },
    ],
    connections: ['Recebe as atividades do professor', 'Vê as notas publicadas'],
  },
] as const

export type RoleId = (typeof ROLES)[number]['id']

export const FAQ = [
  {
    q: 'É só para inglês?',
    a: 'Não. O motor é o mesmo para qualquer componente: Português, Matemática, Ciências, História, Geografia, Arte, Espanhol e projetos.',
  },
  {
    q: 'A IA vai substituir o professor?',
    a: 'Não. A IA faz a primeira correção e sugere a nota. O professor revisa, aprova e decide.',
  },
  {
    q: 'E os dados dos alunos?',
    a: 'Ficam isolados por município, sem rede social nem anúncios. A IA recebe só a resposta, sem nome nem matrícula.',
  },
  {
    q: 'A escola precisa de internet boa?',
    a: 'O modo projeção funciona com um computador na sala, e a plataforma roda em tablets de vários tamanhos.',
  },
  {
    q: 'Precisa integrar com os sistemas da rede ou da escola?',
    a: 'Não para começar: escolas, turmas e alunos entram por planilha. Integrações com o sistema da rede podem ser feitas depois.',
  },
] as const
