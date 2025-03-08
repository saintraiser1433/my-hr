

export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'gray',
      success: 'emerald',
      info: 'blue',
      warning: 'yellow',
      error: 'rose',
      neutral: 'slate',
    },
    table: {
      slots: {
        th: ' p-0 px-5 py-0 text-sm text-(--foreground)',
        td: 'p-0 px-5 py-2 text-sm text-(--foreground)',
      }
    },
    navigationMenu: {
      slots: {
        link: 'cursor-pointer px-3 py-2 text-sm  font-light text-[13px]  ',

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
        {
          disabled: false,
          active: false,
          variant: 'pill',
          class: {
            link: 'hover:text-(--primary-foreground)  dark:hover:text-(--primary-foreground) text-(--foreground) dark:text-(--foreground)  hover:before:bg-(--ui-primary) dark:hover:before:bg-(--ui-primary) transition-colors before:transition-colors',
            linkLeadingIcon: 'text-(--foreground) group-hover:text-(--primary-foreground) transition-colors'
          }
        },

        {
          color: 'primary',
          variant: 'pill',
          active: true,
          class: {
            link: 'text-(--primary-foreground)',
            linkLeadingIcon: 'text-(--primary-foreground) group-data-[state=open]:text-(--primary-foreground)'
          }
        },
        {
          variant: 'pill',
          active: true,
          highlight: false,
          class: {
            link: 'before:bg-(--primary) '
          }
        },

      ],


      defaultVariants: {
        color: 'primary',
        highlightColor: 'neutral',
        variant: 'pill'
      }


    },


    formField: {
      slots: {
        error: 'text-sm font-bold',
        label: 'text-sm'
      }
    },
    modal: {
      slots: {
        overlay: 'bg-white/90 dark:bg-black/80',
        footer: 'sm:px-4 py-3 justify-end',
        body: 'sm:p-4',
        header: 'sm:px-4 py-3',
        title: 'text-sm capitalize',
        description: 'text-xs'
      }
    },

    button: {
      slots: {
        base: 'cursor-pointer'
      },
      compoundVariants: [
        {
          color: 'neutral',
          variant: 'solid',
          class: 'text-white dark:text-black bg-(--ui-bg-inverted) hover:bg-(--ui-bg-inverted)/90 disabled:bg-(--ui-bg-inverted) aria-disabled:bg-(--ui-bg-inverted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-border-inverted)'
        }],
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'sm'

      }
    },
    input: {
      slots: {
        base: 'capitalize'
      }
    },


    dropdownMenu: {
      slots: {
        content: 'bg-(--ui-bg) dark:bg-(--ui-bg)',
        item: 'cursor-pointer',
        itemLabel: 'text-sm',
      },
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'sm'

      }
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
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'sm'

      }
    },

  }
})
