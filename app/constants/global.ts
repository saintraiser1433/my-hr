export const MENU_ITEMS: MenuItem[] = [
  { label: "Navigation", type: 'label' },
  { label: "Dashboard", icon: "i-tabler-device-analytics", to: "/Dashboard" },
  { label: "Applicants", icon: "i-tdesign-user-filled", to: "/applicants" },
  { label: "Employees", icon: "i-clarity-employee-group-solid", to: "/employees" },
  { label: "Departments", icon: "i-game-icons-organigram", to: "/department" },
  {
    label: "Performance",
    icon: "i-mdi-graph-line",
    slot: "components",
    children: [
      { label: "P2P Performance", icon: "i-hugeicons-peer-to-peer-02", to: "/performance/peer" },
      { label: "SE Performance", icon: "i-hugeicons-peer-to-peer-03", to: "/performance/superior" },
    ],
  },
  {
    label: "Evaluation",
    icon: "i-mdi-file-graph",
    children: [
      { label: "Manage Evaluation", icon: "i-hugeicons-question", to: "/evaluation" },
      { label: "Template", icon: "i-mingcute-user-question-fill", to: "/evaluation/template" },
    ],
  },

  { label: "Job Offers", icon: "i-fluent-mdl2-recruitment-management", to: "/job" },
  { label: "Screening", icon: "material-symbols:action-key", to: "/screening" },
  { label: "Requirements", icon: "i-carbon-document-requirements", to: "/requirements" },
  { label: "Settings", icon: "i-mdi-cogs", to: "/settings" },
];


export const MENU_ITEMS_EMP: MenuItem[] = [
  { label: "Navigation", type: 'label' },
  { label: "Dashboard", icon: "i-tabler-device-analytics", to: "/Dashboard" },
  { label: "My Requirements", icon: "i-carbon-document-requirements", to: "/applicants" },
  {
    label: "Peer Evaluation",
    icon: "i-mdi-graph-line",
    slot: "components",
    children: [
      { label: "Evaluate Colleague", icon: "i-hugeicons-peer-to-peer-02", to: "/performance/peer" },
      { label: "Received Evaluation", icon: "i-hugeicons-peer-to-peer-03", to: "/performance/superior" },
    ],
  },
];

export const MENU_ITEMS_TEAM: MenuItem[] = [
  { label: "Navigation", type: 'label' },
  { label: "Dashboard", icon: "i-tabler-device-analytics", to: "/Dashboard" },
  { label: "My Requirements", icon: "i-carbon-document-requirements", to: "/team/requirements" },
  { label: "Evaluate Colleague", icon: "i-hugeicons-peer-to-peer-02", to: "/applicants" },
  { label: "Evaluate Forms", icon: "i-hugeicons-question", to: "/applicants" },

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
    label: 'Settings',
    icon: 'mdi:cogs',
    slot: 'settings'
  }
]