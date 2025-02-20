<template>

    <div class="relative w-(--msidebar) lg:w-(--sidebar) h-screen border-r-[1px] border-(--border) z-50">
        <aside class="fixed w-(--msidebar) lg:w-(--sidebar) ">
            <!-- avatar -->
            <div class="flex items-center gap-2 px-3 py-4">
                <div class="relative flex items-center justify-center p-2 rounded-lg bg-black/80 ">
                    <Icon name="fa6-brands:github-alt" class="text-white h-8 w-8" />
                </div>
                <div class="flex flex-col">
                    <h4>John Doe</h4>
                    <span class="text-xs">Administrator</span>
                </div>

            </div>
            <USeparator />
            <!-- MenuBar -->
            <UNavigationMenu :items="items" orientation="vertical" class="w-full justify-center" :ui="{
                link:'py-2 text-(--ui-secondary) font-medium cursor-pointer px-3',
                linkLeadingIcon: 'text-primary'
            }">
                

            </UNavigationMenu>
        </aside>

        <div class="fixed bottom-0 w-(--msidebar) lg:w-(--sidebar) py-3 flex items-center px-3">

            <div class="rounded-md bg-gray-200 p-2">
                CN
            </div>
            <div class="flex flex-col px-2 flex-1">
                <h4>John Doe</h4>
                <span class="text-xs">saintraiser@gmail.com</span>
            </div>
            <div class="flex-none">
                <Icon name="lucide:chevrons-up-down" class="h-7 w-7" />
            </div>
        </div>


    </div>



</template>

<script setup>

const items = ref([
    [
        {
            label: 'Navigation',
            type: 'label'
        },
        {
            label: 'Home',
            icon: 'i-lucide-book-open',
            to: '/composable/'
        },
        {
            label: 'Composables',
            icon: 'i-lucide-database',
            children: [
                {
                    label: 'defineShortcuts',
                    icon: 'i-lucide-file-text',
                    description: 'Define shortcuts for your application.',
                    to: '/composables/define-shortcuts'
                },
                {
                    label: 'useModal',
                    icon: 'i-lucide-file-text',
                    description: 'Display a modal within your application.',
                    to: '/composables/use-modal'
                },
                {
                    label: 'useSlideover',
                    icon: 'i-lucide-file-text',
                    description: 'Display a slideover within your application.',
                    to: '/composables/use-slideover'
                },
                {
                    label: 'useToast',
                    icon: 'i-lucide-file-text',
                    description: 'Display a toast within your application.',
                    to: '/composables/use-toast'
                }
            ]
        },
        {
            label: 'Components',
            icon: 'i-lucide-box',
            to: '/components',

            children: [
                {
                    label: 'Link',
                    icon: 'i-lucide-file-text',
                    description: 'Use NuxtLink with superpowers.',
                    to: '/components/link'
                },
                {
                    label: 'Modal',
                    icon: 'i-lucide-file-text',
                    description: 'Display a modal within your application.',
                    to: '/components/modal'
                },
                {
                    label: 'NavigationMenu',
                    icon: 'i-lucide-file-text',
                    description: 'Display a list of links.',
                    to: '/components/navigation-menu'
                },
                {
                    label: 'Pagination',
                    icon: 'i-lucide-file-text',
                    description: 'Display a list of pages.',
                    to: '/components/pagination'
                },
                {
                    label: 'Popover',
                    icon: 'i-lucide-file-text',
                    description: 'Display a non-modal dialog that floats around a trigger element.',
                    to: '/components/popover'
                },
                {
                    label: 'Progress',
                    icon: 'i-lucide-file-text',
                    description: 'Show a horizontal bar to indicate task progression.',
                    to: '/components/progress'
                }
            ]
        },
        {
            label: 'Employees',
            icon: 'i-lucide-book-open',
            to: '/composable/'
        },
        {
            label: 'Employee Performance',
            icon: 'i-lucide-book-open',
            to: '/composable/'
        },
        {
            label: 'Hired Employees',
            icon: 'i-lucide-book-open',
            to: '/composable/'
        },
        {
            label: 'Applicants',
            icon: 'i-lucide-book-open',
            to: '/composable/'
        },


    ],

])

</script>

<style lang="scss" scoped></style>