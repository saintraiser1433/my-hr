
  
  // Define your navigation menu

import { MENU_ITEMS } from "~/constants/global";

  
  // Recursive function to find the breadcrumb path
  const findBreadcrumbPath = (
    items: MenuItem[],
    path: string,
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] | null => {
    for (const item of items) {
      if (item.to === path) {
        return [...breadcrumbs, { label: item.label, icon: item.icon, to: item.to }];
      }
      if (item.children) {
        const found = findBreadcrumbPath(item.children, path, [
          ...breadcrumbs,
          { label: item.label, icon: item.icon, to: item.to },
        ]);
        if (found) return found;
      }
    }
    return null;
  };
  
  // Define the composable
  export function useBreadcrumbs() {
    const route = useRoute();
  
    const breadcrumbs = computed<BreadcrumbItem[]>(() => {
      const path = route.path;
      const breadcrumbPath = findBreadcrumbPath(MENU_ITEMS, path);
      return breadcrumbPath
        ? [{ label: "Home", icon: "i-mdi-home", to: "/" }, ...breadcrumbPath]
        : [{ label: "Home", icon: "i-mdi-home", to: "/" }];
    });
  
    return { breadcrumbs };
  }
  