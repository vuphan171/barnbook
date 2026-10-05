# Barnbook

React Native 0.87 app (TypeScript, bare RN CLI, npm). `@/*` maps to `src/*`.

## Commands

- `npm run ios` / `npm run android`: run the app
- `npm run typecheck`: type-check
- `npm run lint`: ESLint
- `npm run format`: Prettier, also sorts imports (react → react-native → packages → `@/` → relative)
- `npm test`: Jest

Git hooks (husky): pre-commit runs Prettier on staged files (lint-staged), pre-push runs `npm run typecheck`.

## Structure

- `src/components/ui/`: shared UI components (kebab-case files, named exports: `import { Button } from '@/components/ui/button'`)
- `src/components/icons/`: SVG icons (one per file, `react-native-svg`), imported from the folder: `import { EyeIcon } from '@/components/icons'`
- `src/features/<name>/`: feature screens, re-exported from `index.ts`
- `src/services/`: API layer and app-wide clients (`query-client.ts`)
- `src/utils/`: pure helpers shared across features (no React)
- `src/themes/`: design tokens (`COLORS`, `SPACING`, `RADIUS`, `FONT_SIZE`...)
- `src/navigation/`: React Navigation stack and route types

## Code style

- Only comment non-obvious behavior (platform quirks, surprising workarounds). Never restate what simple code does.
- A component's internal props type is named `Props`, not `ButtonProps`. Use a longer name only if it is exported.
- No homemade mini-libraries (e.g. a custom cva clone). Prefer plain React Native APIs or an established package.

## Styling

- Use `StyleSheet` with tokens from `@/themes`. Never hardcode colors or spacing, and never use `PALETTE` outside `colors.ts`.
- Component variants and sizes are tables of grouped styles, read like cva:
  ```tsx
  const VARIANTS = {
    primary: StyleSheet.create({ container: {...}, pressed: {...}, label: {...} }),
  };
  const v = VARIANTS[variant];
  ```
  Derive the prop type from the table: `type ButtonVariant = keyof typeof VARIANTS`. Don't build style keys from strings (`styles[`${variant}Pressed`]`).
- Interactive colors are grouped tokens: `COLORS.primary.default / .pressed / .foreground`. Pressed states use an explicit color, not opacity.
- UI components extend the underlying RN props (`Omit<PressableProps, ...> & {...}`) and spread `...rest` onto the native element.

## Data

- Server state goes through React Query (`@tanstack/react-query`): `useQuery` for reads, `useMutation` for writes.
- Services are objects named `XService` with methods defined inline:
  ```ts
  export const AuthService = {
    login: async (params: LoginParams): Promise<LoginResponse> => {...},
  };
  ```
- Show errors with `<ErrorMessage error={...} />` (accepts `string | Error | null`).
