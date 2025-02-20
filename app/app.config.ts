export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'indigo',
      secondary: 'gray',
      success: 'emerald',
      info: 'blue',
      warning: 'yellow',
      error: 'rose',
      neutral: 'slate',
    },
    navigationMenu: {
      slots: {
        // link: 'group relative w-full flex items-center text-black gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
        link: 'cursor-pointer px-3 py-2 text-sm text-(--foreground) ',
      }

    },
    breadcrumb: {
      slots: {
        link: 'text-sm'
      },
      variants: {
        active: {
          true: {
            link: 'text-slate-950 font-semibold'
          },
          false: {
            link: 'text-(--ui-text-muted) font-medium'
          }
        }
      },
    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    }
  }
})
