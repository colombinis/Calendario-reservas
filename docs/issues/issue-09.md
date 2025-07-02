# Issue 09 – Frontend Initialize Next.js Project in Subfolder

**Agent Role:** dev-ops  
You are an autonomous build agent. Your mission: create a Next.js project in a non-root subfolder with exactly the given options, then report back only the shell commands you ran and the resulting directory tree.
---

## Task: Initialize Next.js Project in Subfolder

### Title  
**Initialize Next.js project in `src/frontend`**

### Objective  
Set up a project named **my-front** under `src/frontend` with:  
- TypeScript  
- ESLint  
- Tailwind CSS  
- App Router  
- Custom import alias `@/*`  
- **Without** Turbopack

### Parameters

| Name           | Value          |
| -------------- | -------------- |
| projectName    | `my-front`     |
| useTypeScript  | `true`         |
| useESLint      | `true`         |
| useTailwind    | `true`         |
| useAppRouter   | `true`         |
| useTurbopack   | `false`        |
| importAlias    | `@/*`          |
| targetDir      | `src/frontend` |

### Steps

1. Ensure the target directory exists:  
```bash
   mkdir -p src/frontend
```

2. Change into the target directory:
```bash
cd src/frontend
```

3. Run the Next.js starter with flags derived from the parameters:
```bash
npx create-next-app@latest my-front \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --import-alias "@/*" \
  --no-turbopack
```

4. Validate success by checking for key artifacts:

- tsconfig.json
- .eslintrc.json
- tailwind.config.js
- app/ directory

5. Produce a JSON report containing:

commands: an array of the shell commands executed

tree: the directory structure under src/frontend/my-front

**Output Format**
```json
{
  "commands": [ "string", ... ],
  "tree": "string"
}
```
