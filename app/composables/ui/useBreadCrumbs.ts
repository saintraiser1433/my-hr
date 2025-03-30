// composables/useRoleBasedBreadcrumbs.ts
import type { BreadcrumbItem, NavigationMenuItem } from '#ui/types'
import type { RouteLocationRaw } from 'vue-router'

export default function useRoleBasedBreadcrumbs() {
  const route = useRoute()
  const store = useAuthStore()

  // Helper to convert RouteLocationRaw to string path
  const toPathString = (to: RouteLocationRaw): string => {
    if (typeof to === 'string') return to
    if ('path' in to) return to.path || ''
    return ''
  }

  // Get menu items based on current role
  const getMenuItems = computed(() => {
    switch (store.getRole) {
      case 'Admin': return ADMIN_MENU_ITEMS
      case 'Employee': return EMPLOYEE_MENU_ITEMS
      case 'TeamLead': return TEAM_LEAD_MENU_ITEMS
      default: return []
    }
  })

  // Find matching menu item for current path
  const findMenuItem = (path: string, items: NavigationMenuItem[]): NavigationMenuItem | null => {
    for (const item of items) {
      const itemPath = item.to ? toPathString(item.to) : ''

      // Check exact match
      if (itemPath === path) return item

      // Check parameterized routes
      if (itemPath && typeof itemPath === 'string') {
        const paramIndex = itemPath.indexOf(':')
        if (paramIndex > -1) {
          const basePath = itemPath.substring(0, paramIndex)
          if (path.startsWith(basePath)) {
            return item
          }
        }
      }

      // Check children recursively
      if (item.children) {
        const found = findMenuItem(path, item.children)
        if (found) return found
      }
    }
    return null
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{
      label: 'Home',
      icon: 'i-lucide-house',
      to: '/'
    }]

    const pathSegments = route.path.split('/').filter(Boolean)
    let currentPath = ''

    for (const segment of pathSegments) {
      currentPath += `/${segment}`
      const menuItem = findMenuItem(currentPath, getMenuItems.value)

      if (menuItem && menuItem.to) {
        const itemPath = toPathString(menuItem.to)

        // Handle parameterized routes
        if (typeof itemPath === 'string' && itemPath.includes(':')) {
          const basePath = itemPath.split(':')[0]
          breadcrumbs.push({
            label: menuItem.label,
            icon: menuItem.icon,
            to: basePath
          })

          // Add the ID segment
          breadcrumbs.push({
            label: segment,
            to: currentPath,
            disabled: true
          })
        } else {
          // Regular menu item
          breadcrumbs.push({
            label: menuItem.label,
            icon: menuItem.icon,
            to: menuItem.to
          })
        }
      } else if (breadcrumbs.length > 1) {
        // Fallback for unmatched segments
        breadcrumbs.push({
          label: segment,
          to: currentPath,
          disabled: true
        })
      }
    }

    return breadcrumbs
  }

  const items = ref<BreadcrumbItem[]>(generateBreadcrumbs())

  // Watch for route and role changes
  watch([() => route.path, () => store.getRole], () => {
    items.value = generateBreadcrumbs()
  })

  return {
    items
  }
}