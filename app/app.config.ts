

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

        link: 'cursor-pointer px-3 py-2 text-sm  font-light cursor-pointer px-3 py-2 text-[13px]',
      },
      compoundVariants: [
        {
          orientation: 'vertical',
          collapsed: false,
          class: {
            childList: 'ms-5 border-s border-(--ui-border) dark:border-(--ui-border)',
            childItem: 'ps-1.5 -ms-px'
          }
        },
      ],


    },
    breadcrumb: {
      slots: {
        link: 'text-sm'
      },
      variants: {
        active: {
          true: {
            link: 'text-(--foreground) dark:text-(--foreground)  font-medium'
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
