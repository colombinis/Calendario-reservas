# Copilot Instructions for Calendario-reservas

## Core Commands
- No build, lint, or test scripts detected in the workspace (no `package.json`, `Makefile`, or similar found).
- No explicit migration or documentation generation commands found.
- Manual testing and documentation updates are likely required.

## High-Level Architecture
- **Frontend/Backend separation**: Not explicitly defined, but folders suggest modularity (`app/`, `components/`, `lib/`).
- **Authentication**: Supports user/password, Google, and email link (see README).
- **Data Store**: Likely uses Supabase (`supabase/` folder present).
- **UI/UX**: Calendar-based reservation system, color-coded availability, filters, and pagination.
- **Auditing**: Actions are logged/audited (per README).
- **Docs**: Project documentation in `docs/`, including agentic task execution framework in `docs/prompts/task-execution.md`.
- **Testing**: `tests/` folder exists, but no test runner or config detected.

## Repo-Specific Style Rules
- No explicit formatting, import, typing, or naming rules found in the workspace.
- No `.editorconfig`, `.prettierrc`, or linter config detected.
- Follow clear, production-ready code with proper error handling and documentation (see agentic framework in `docs/prompts/task-execution.md`).
- Document all major changes and agent actions as per the agentic framework.

## Agent Rules
- Follow the "Agentic Task Execution Framework" in `docs/prompts/task-execution.md`:
  - Plan, execute, and validate in up to 3 attempts.
  - Document all results, failures, and learnings.
  - Create `{TASK_NAME}_execution_report.md` for major tasks.
  - Focus on reliability, repeatability, and clear documentation.
- No `.github/copilot-instructions.md` or other agent config files found; this file is now the canonical source.

## Additional Notes
- Summarize and reference, do not copy, README or docs content.
- If new commands, style rules, or agent instructions are added, update this file.
