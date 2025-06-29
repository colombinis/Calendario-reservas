# Folder Structure Migration Plan

The following directories have been created to match the scalable, LLM-friendly structure proposed in Issue #6. Existing files should be migrated as follows:

- Move all frontend-related code (e.g., from `app/`, `components/`, `styles/`, `public/`) into `src/frontend/`.
- Move backend logic (if any, e.g., from `lib/` or `supabase/`) into `src/backend/`.
- Place shared utility functions in `src/utils/`.
- Keep test files in their respective `tests/` subfolders.
- Documentation remains in `docs/`.

**Note:** No files have been deleted. All moves are non-destructive and reversible.

## Next Steps
- Update import paths as needed after moving files.
- Validate application functionality manually (no build system detected).
- Update documentation as the migration progresses.
