# SpeakFlow Escolas — App Android

App exclusivo da plataforma **SpeakFlow Escolas** para professores, coordenadores e gestores.
Carrega `https://speakflow.ia.br/escola` via WebView nativo.

---

## Setup inicial (faça UMA vez)

```bash
cd C:\Projetos\SpeakFlowEscolasApp

# 1. Instalar dependências
npm install

# 2. Registrar o app no EAS (conta CoDevelop Solutions)
npx eas init --id <cole-o-project-id-do-expo.dev-ou-deixe-criar-novo>
#   ➜ Cole o projectId gerado no campo "extra.eas.projectId" do app.json

# 3. Login (se ainda não estiver logado)
npx eas login
```

## Copiar ícones (faça UMA vez)

```
assets/
  icon.png            ← 1024x1024 — copiar de ..\codevelop-pages\codevelop-page\expo\icon.png
  adaptive-icon.png   ← 1024x1024 — copiar de ..\codevelop-pages\codevelop-page\expo\adaptive-icon.png
  splash.png          ← 1284x2778 — copiar de ..\codevelop-pages\codevelop-page\expo\splash-icon.png
```

## Build APK (para testar / distribuir diretamente)

```bash
npm run build:apk
# ou: npx eas build --platform android --profile preview
```

O EAS devolve um link para download do `.apk` — instale direto no celular ou distribua por link.

## Build AAB (para publicar no Google Play)

```bash
npm run build:aab
# ou: npx eas build --platform android --profile production
```

Faça upload do `.aab` no Google Play Console → **Criar app** → "SpeakFlow Escolas".

## Publicar automaticamente no Play (opcional)

1. Gere a chave de serviço no Google Play Console → Configurações da conta → API
2. Salve como `google-services-key.json` na raiz deste projeto (está no .gitignore)
3. `npm run submit:android`

---

## Estrutura

```
SpeakFlowEscolasApp/
├── App.tsx          ← WebView que carrega speakflow.ia.br/escola
├── app.json         ← Config Expo (nome, ícones, package, versão)
├── eas.json         ← Perfis de build (preview=APK, production=AAB)
├── assets/
│   ├── icon.png
│   ├── adaptive-icon.png
│   └── splash.png
└── package.json
```
