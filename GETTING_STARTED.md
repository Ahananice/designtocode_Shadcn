# Getting Started

This project turns UI design screenshots into production-ready React/TypeScript [Shadcn/ui](https://ui.shadcn.com/) components using a Claude Code agent.

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 20 | [nodejs.org](https://nodejs.org) |
| npm | ≥ 10 | bundled with Node |
| Git | any | [git-scm.com](https://git-scm.com) |
| Claude Code | latest | `npm install -g @anthropic-ai/claude-code` |
| GitHub CLI | any | `winget install GitHub.cli` · `brew install gh` |

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/Ahananice/designtocode_Shadcn.git
cd designtocode_Shadcn
```

### 2. Authenticate the npm registry

This repo uses a private AWS CodeArtifact registry. Refresh your token before installing:

```bash
aws codeartifact login \
  --tool npm \
  --domain nice-devops \
  --domain-owner 369498121101 \
  --region us-west-2 \
  --repository cxone-npm
```

> Tokens expire after 12 hours. Re-run this command whenever `npm install` returns an auth error.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the dev server

```bash
npm run dev
# → http://localhost:5173
```

### 5. Start Storybook

```bash
npm run storybook
# → http://localhost:6006
```

---

## Using the design-to-code agent

### Generate a component from a screenshot

1. Open Claude Code in this directory:
   ```bash
   claude
   ```
2. Paste a UI screenshot directly into the chat (drag-and-drop or paste from clipboard).
3. The agent will:
   - Analyse the design (colors, layout, elements, states, variants)
   - Generate `src/components/{ComponentName}.tsx`
   - Generate `src/stories/{ComponentName}.stories.tsx`
   - Confirm before creating a PR (see below)

### Create a GitHub PR

After the component is generated, the agent waits for you to ask. Say something like:

> "create a PR" · "open a PR" · "raise a PR" · "push and create PR"

The agent will then:

```
git checkout -b feat/add-{component-name}
git add src/components/... src/stories/...
git commit -m "feat: add {ComponentName} component from design"
git push -u origin feat/add-{component-name}
gh pr create --title "..." --body "..."
```

### Preview in Storybook

After a component is generated (with or without a PR), run:

```bash
npm run storybook
```

Navigate to **Components / {ComponentName}** to see all variants and states.

---

## Project structure

```
designtocode_Shadcn/
├── .claude/
│   └── agents/
│       └── design-to-code.md     # Claude Code sub-agent definition
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── components/
│   │   ├── ui/                   # Shadcn/ui base components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── select.tsx
│   │   │   └── textarea.tsx
│   │   └── {GeneratedComponent}.tsx   # ← agent writes here
│   ├── stories/
│   │   └── {GeneratedComponent}.stories.tsx  # ← agent writes here
│   ├── lib/
│   │   └── utils.ts              # cn() helper
│   ├── App.tsx
│   ├── index.css                 # Shadcn/ui CSS variables + Tailwind
│   └── main.tsx
├── components.json               # Shadcn/ui config
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 5173 |
| `npm run build` | Type-check + production build |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |

## Available Shadcn/ui components

All base components live in `src/components/ui/` and are ready to import:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
```

## Troubleshooting

**`npm error E401` — auth token expired**  
Re-run the `aws codeartifact login` command from Step 2.

**`gh: command not found`**  
Install the GitHub CLI:  Windows: `winget install GitHub.cli` · Mac: `brew install gh`  
Then authenticate: `gh auth login`

**Storybook shows a blank page**  
Make sure `src/index.css` is imported in `.storybook/preview.ts` (it is by default).

**Component not found in Storybook**  
Ensure the story file is at `src/stories/{ComponentName}.stories.tsx` — the glob in `.storybook/main.ts` covers `src/**/*.stories.*`.
