# Security — Public Repository

This is a PUBLIC GitHub repository. Every file committed is visible to everyone.

## Absolute Rules
- NEVER include API keys, tokens, passwords, or secrets in any file
- NEVER hardcode URLs with credentials or internal endpoints
- NEVER commit `.env` files — use `.env.example` with placeholder values only
- NEVER include personal data (emails, phone numbers, addresses) in code or comments
- All sensitive configuration goes through environment variables prefixed with `PUBLIC_` (SvelteKit convention for client-safe vars)

## If You Need a Secret
1. Add it to `.env` (which is gitignored)
2. Add a placeholder to `.env.example`
3. Reference it in code via `$env/static/public` or `$env/static/private`
4. Document the variable in CLAUDE.md under Commands section
