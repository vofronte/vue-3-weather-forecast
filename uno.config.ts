import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { createRemToPxProcessor } from '@unocss/preset-wind4/utils'
import { defineConfig, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
        theme: {
          process: createRemToPxProcessor(),
        },
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Geologica',
          weights: ['400', '500', '600', '700'],
        },
      },
      processors: createLocalFontProcessor({
        fontAssetsDir: 'public/fonts',
      }),
    }),
  ],
  postprocess: [createRemToPxProcessor()],
  shortcuts: {
    'bg-main-gradient': 'bg-[linear-gradient(116.21deg,#052652_-3.25%,#2D9CDB_107.37%)]',
    'bg-card-gradient': 'bg-[radial-gradient(134.39%_134.39%_at_-17.89%_-22.86%,rgba(255,255,255,0.2)_0%,rgba(238,237,237,0.1)_100%)]',
    'tracking-tightest': 'tracking-[-0.01em]',
    'card-base': `
      px-4 py-6 text-center rounded-lg bg-card-gradient
      border border-white/10
      `,
    'card-glare-effect': `
      relative overflow-hidden
      transition-all duration-200 ease-out
      before:content-['']
      before:absolute before:inset-0 before:rounded-inherit
      before:bg-[radial-gradient(circle_200px_at_var(--x)_var(--y),rgba(255,255,255,0.15),transparent_80%)]
      before:opacity-[var(--opacity)]
      before:transition-opacity before:duration-200 before:ease-out
      before:z-0
    `,
  },
})
