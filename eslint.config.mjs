import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Desabilita todas as regras problemáticas
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
])

export default eslintConfig