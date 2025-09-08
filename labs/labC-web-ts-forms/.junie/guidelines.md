# Guidelines (Web/TypeScript)
- Use accessible selectors first: `getByRole`, `getByLabelText`, etc.
- Separate pure validation helpers; unit test them directly.
- Jest + Testing Library; avoid snapshots unless justified.
- Keep components small; prefer composition over branches.
