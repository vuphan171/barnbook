# Barnbook

React Native 0.87 app (TypeScript, bare RN CLI, npm). `@/*` maps to `src/*`.

## Commands

- `npm run ios` / `npm run android`: run the app
- `npm run typecheck`: type-check
- `npm run lint`: ESLint
- `npm run format`: Prettier, also sorts imports into blank-line groups: react, react-native, packages → `@/features` `@/screens` → `@/navigation` → `@/components` → `@/services` → `@/utils` `@/i18n` → `@/configs` `@/themes` → other `@/` → relative
- `npm test`: Jest

Git hooks (husky): pre-commit runs Prettier on staged files (lint-staged), pre-push runs `npm run typecheck`.

## Structure

- `src/components/ui/`: shared UI components (kebab-case files, named exports: `import { Button } from '@/components/ui/button'`)
- `src/components/icons/`: SVG icons (one per file, `react-native-svg`), imported from the folder: `import { EyeIcon } from '@/components/icons'`
- `src/features/<name>/`: feature screens, re-exported from `index.ts`
- `src/services/`: API layer and app-wide clients (`query-client.ts`)
- `src/utils/`: pure helpers shared across features (no React)
- `src/configs/`: static app config (external URLs, ...)
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
- Colors are flat tokens in `COLORS`, brand colors as a pair `primary` / `primaryForeground` (shadcn style). No pressed tokens: solid buttons use `opacity: 0.9` when pressed, light/outline ones use `COLORS.muted`.
- Font is Be Vietnam Pro (`assets/fonts`, linked with `npx react-native-asset`). Set weight with `fontFamily: FONT_FAMILY.semibold`, never `fontWeight`. Every text style, including `TextInput`, needs a `fontFamily`.
- UI components extend the underlying RN props (`Omit<PressableProps, ...> & {...}`) and spread `...rest` onto the native element.

## i18n

- Translations live in `src/i18n/locales/<lang>/<feature>.ts`, one top-level key per file, combined in `<lang>/index.ts`. Each `vi` file is typed `typeof en` so missing keys fail typecheck.
- A sentence with inline styled or pressable parts is one translation key rendered with `<Trans>`, never several keys glued together in JSX:
  ```tsx
  // en: haveAccount: 'Already have an account? <signIn>Sign In</signIn>'
  <Typography>
    <Trans
      i18nKey='signUp.haveAccount'
      components={{ signIn: <Typography asLink onPress={goToSignIn} /> }}
    />
  </Typography>
  ```
- `<Trans>` renders a Fragment, so wrap it in a `Typography`. Nested `Typography` elements must pass the same `variant` as their parent, because the default variant `body` overrides the inherited font size.

## Data

- Server state goes through React Query (`@tanstack/react-query`): `useQuery` for reads, `useMutation` for writes.
- Services are objects named `XService` with methods defined inline:
  ```ts
  export const AuthService = {
    login: async (params: LoginParams): Promise<LoginResponse> => {...},
  };
  ```
- Show errors with `<ErrorMessage error={...} />` (accepts `string | Error | null`).
