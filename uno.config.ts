import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { createRemToPxProcessor } from '@unocss/preset-wind4/utils'
import { defineConfig, presetAttributify, presetWebFonts, presetWind4 } from 'unocss'

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
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Geologica',
          weights: ['400', '700'],
        },
      },
      processors: createLocalFontProcessor({
        fontAssetsDir: 'public/fonts',
      }),
    }),
  ],
  postprocess: [createRemToPxProcessor()],
})
