# Copilot / AI agent instructions — Pokedex (Eduardo)

Purpose
- Small static Pokedex web app. Single-page HTML loads `app.js`, which fetches data from the public PokeAPI and renders Pokemon cards into the DOM.

Big picture (what to know first)
- Entry point: `index.html` — includes `style.css` and `app.js`.
- Main runtime flow: `fetchPokemons()` -> `getPokemons(id)` -> `createPokemonCard(poke)` -> appends into `#pokeContainer`.
- Search/navigation: user input `#entrada` is read by `buscar()`, results go to `#resultado`; `proximo()` / `anterior()` use a module-level `contador` to step through ids.

Key files & patterns (refer to these when making changes)
- `app.js`: central JS. Look for:
  - `const pokemonCount = 151` — change this to limit how many are loaded.
  - `fetchPokemons()` uses `for (let i=1; i<=pokemonCount; i++) await getPokemons(i)` (sequential fetch).
  - `colors` object maps main type names to background colors; `mainTypes = Object.keys(colors)` is used to pick a card color.
  - DOM ids/classes: `pokeContainer`, `entrada`, `resultado`, `pokemon` (card class).
- `index.html`: static UI in Portuguese; assets live in `assents/` (note the folder name/typo).
- `style.css`: global styles and font imports — CSS controls card layout and responsiveness.

Project-specific conventions
- UI text and identifier names are in Portuguese (e.g., `buscar`, `proximo`, `anterior`, `contador`). Keep new UI text consistent with Portuguese.
- Code is simple, imperative, and uses global functions and DOM-embedded `onclick` handlers (e.g., `<button onclick="buscar()">`). When adding features, match the existing pattern unless refactoring the whole app.

External integrations & resources
- Primary API: https://pokeapi.co/api/v2/pokemon/{id|name}
- Sprite images are loaded from the PokeAPI sprites repo via `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`.
- Fonts are imported in `style.css` via Google Fonts.

Run / debug instructions
- No build system — open `index.html` in a browser for quick checks.
- For local HTTP server (recommended):
  - Python: `python -m http.server 8000`
  - Node: `npx http-server` or use VS Code Live Server extension.
- Use the browser console for network/API errors. Typical failure modes: network errors to PokeAPI or malformed JSON when an invalid search term is used.

Quick examples (copy-paste)
- Limit loaded pokemons to 50: in `app.js` set `const pokemonCount = 50`.
- Change the color for `fire` type: edit `colors.fire` value in `app.js`.
- Search uses the input id `entrada` and displays a single card in `#resultado` via `buscar()` — inspect `buscar()` in `app.js` for exact DOM structure to match when adding features.

Notes for contributors / agents
- Preserve the simple static-site structure unless the task explicitly requires adding a build step or npm tooling; if you add tooling, document it in a new README and in this file.
- Be conservative changing public identifiers (`#entrada`, `#resultado`, `pokeContainer`) because templates in `index.html` reference them directly.
- If you refactor async fetching, note that current behavior is sequential (slow for many items). Document any change in behavior in this file.

If anything above is unclear or you want examples for a specific change (refactor fetch, add paging, convert to modular JS), tell me which area you want and I'll expand the instructions or make a patch.
