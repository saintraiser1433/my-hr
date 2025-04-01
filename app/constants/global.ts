import type { NavigationMenuItem } from "@nuxt/ui";



export const ADMIN_MENU_ITEMS: NavigationMenuItem[] = [
  { label: "Navigation", type: "label" },
  { label: "Dashboard", icon: "i-tabler-device-analytics", to: "/Dashboard" },
  { label: "Applicants", icon: "i-tdesign-user-filled", to: "/Applicants" },
  { label: "Employees", icon: "i-clarity-employee-group-solid", to: "/Employees" },
  { label: "Departments", icon: "i-game-icons-organigram", to: "/Department" },
  {
    label: "Performance",
    icon: "i-mdi-graph-line",
    to: "/Performance",
  },
  {
    label: "Evaluation",
    icon: "i-mdi-file-graph",
    children: [
      { label: "Manage Evaluation", icon: "i-hugeicons-question", to: "/Evaluation" },
      {
        label: "Template",
        icon: "i-mingcute-user-question-fill",
        to: "/Evaluation/template",
      },
    ],
  },
  { label: "Job Offers", icon: "i-fluent-mdl2-recruitment-management", to: "/Job" },
  { label: "Screening", icon: "material-symbols:action-key", to: "/Screening" },
  {
    label: "Requirements",
    icon: "i-carbon-document-requirements",
    to: "/Requirements",
  },
];



export const EMPLOYEE_MENU_ITEMS: NavigationMenuItem[] = [
  { label: "Navigation", type: "label" },
  { label: "Evaluate Colleague", icon: "i-hugeicons-peer-to-peer-02", to: "/emp" },
  {
    label: "Received Evaluation",
    icon: "i-hugeicons-peer-to-peer-03",
    to: "/emp/result",
  },
  {
    label: "My Requirements",
    icon: "i-carbon-document-requirements",
    to: "/emp/requirements",
  },
];

export const TEAM_LEAD_MENU_ITEMS: NavigationMenuItem[] = [
  { label: "Navigation", type: "label" },
  {
    label: "Evaluate Colleague",
    icon: "i-hugeicons-peer-to-peer-02",
    to: "/team/evaluate",
  },
  {
    label: "My Requirements",
    icon: "i-carbon-document-requirements",
    to: "/team/requirements",
  },
  { label: "Evaluate Forms", icon: "i-hugeicons-question", to: "/team/categories" },
];

export const TAB_ITEMS = [
  {
    label: 'Pending Applicants',
    icon: 'i-lucide-user',
    slot: 'pending'
  },
  {
    label: 'Ongoing Applicants',
    icon: 'i-lucide-timer',
    slot: 'ongoing'
  },
  {
    label: 'Passed Applicants',
    icon: 'i-lucide-check',
    slot: 'passed'
  },
  {
    label: 'Failed Applicants',
    icon: 'i-lucide-x',
    slot: 'failed'
  },
  {
    label: 'Rejected Applicants',
    icon: 'i-lucide-x',
    slot: 'rejected'
  },

]

export const RELIGIONS_ITEM = [
  'Roman Catholicism',
  'Islam',
  'Iglesia ni Cristo',
  'Evangelical Christianity',
  'Aglipayan (Philippine Independent Church)',
  'Protestantism',
  'Buddhism',
  'Jehovah\'s Witnesses',
  'Seventh-day Adventist Church',
  'Mormonism (Church of Jesus Christ of Latter-day Saints)',
  'Hinduism',
  'Taoism',
  'Indigenous Philippine Religions']

export const CIVIL_STATUS_ITEM = ['Single', 'Married', 'Complicated', 'Widowed', 'Separated', 'Divorced'];

export const DESCRIPTION_ITEM = ['Primary', 'Secondary', 'Tertiary', 'Others'];

export const GENDER_ITEM = ['Male', 'Female'];

export const TAB_EMP = [
  {
    label: 'Personal Information',
    icon: 'si:user-line',
    slot: 'information'
  },
  {
    label: 'Educational Attainment',
    icon: 'qlementine-icons:education-16',
    slot: 'education'
  },
  {
    label: 'Work Experience',
    icon: 'material-symbols:work-outline',
    slot: 'work'
  },
  {
    label: 'Skill & Expertise',
    icon: 'uil:setting',
    slot: 'skill'
  },
  {
    label: 'References',
    icon: 'material-symbols-light:quick-reference-all-outline',
    slot: 'reference'
  },
  {
    label: 'Account Settings',
    icon: 'mdi:cogs',
    slot: 'settings'
  }
]

export const SEMESTER_ITEM = [
  {
    id: 1,
    label: 'First Semester'
  },
  {
    id: 2,
    label: 'Second Semester'
  }
]

export const STATUS_ITEM: statusesEvaluation[] = [
  'PENDING',
  'ONGOING',
  'COMPLETED'
]

export const shadcnPalette = [
  "#1E293B", // Dark Blue - PENDING
  "#3B82F6", // Blue - ONGOING
  "#22C55E", // Green - PASSED
  "#EF4444", // Red - REJECTED
  "#F97316", // Orange - FAILED
  "#EAB308", // Yellow
  "#A855F7", // Purple
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#6366F1", // Indigo
  "#2DD4BF", // Cyan
  "#9333EA", // Deep Violet
  "#F43F5E", // Rose
  "#0EA5E9", // Sky Blue
  "#D97706", // Amber
  "#059669", // Emerald
  "#B91C1C", // Dark Red
  "#7C3AED", // Deep Purple
  "#047857", // Deep Teal
  "#FACC15", // Bright Yellow
];

export const shadowPalette = [
  "rgba(30, 41, 59, 0.4)",  // Dark Blue - PENDING
  "rgba(59, 130, 246, 0.3)", // Blue - ONGOING
  "rgba(34, 197, 94, 0.3)",  // Green - PASSED
  "rgba(239, 68, 68, 0.3)",  // Red - REJECTED
  "rgba(249, 115, 22, 0.3)", // Orange - FAILED
  "rgba(234, 179, 8, 0.3)",  // Yellow
  "rgba(168, 85, 247, 0.3)", // Purple
  "rgba(236, 72, 153, 0.3)", // Pink
  "rgba(20, 184, 166, 0.3)", // Teal
  "rgba(99, 102, 241, 0.3)", // Indigo
  "rgba(45, 212, 191, 0.3)", // Cyan
  "rgba(147, 51, 234, 0.3)", // Deep Violet
  "rgba(244, 63, 94, 0.3)",  // Rose
  "rgba(14, 165, 233, 0.3)", // Sky Blue
  "rgba(217, 119, 6, 0.3)",  // Amber
  "rgba(5, 150, 105, 0.3)",  // Emerald
  "rgba(185, 28, 28, 0.3)",  // Dark Red
  "rgba(124, 58, 237, 0.3)", // Deep Purple
  "rgba(4, 120, 87, 0.3)",   // Deep Teal
  "rgba(250, 204, 21, 0.3)", // Bright Yellow
];