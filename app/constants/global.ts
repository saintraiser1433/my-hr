export const MENU_ITEMS: MenuItem[] = [
  { label: "Navigation", type: 'label' },
  { label: "Dashboard", icon: "i-tabler-device-analytics", to: "/" },
  { label: "Applicants", icon: "i-tdesign-user-filled", to: "/applicants" },
  { label: "Employees", icon: "i-clarity-employee-group-solid", to: "/employees" },
  {
    label: "Organization",
    icon: "i-fluent-organization-12-filled",
    slot: "components",
    children: [
      { label: "Departments", icon: "i-game-icons-organigram", to: "/organization/department" },
      { label: "Team Lead", icon: "i-ri-team-fill", to: "/organization/teamlead" },
    ],
  },
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
    to: "/evaluation"
    // children: [
    //   { label: "Evaluation Question", icon: "i-hugeicons-question", to: "/evaluation/question" },
    //   { label: "Manage Evaluation", icon: "i-mingcute-user-question-fill", to: "/evaluation/manage" },
    // ],
  },
  
  { label: "Job Offers", icon: "i-fluent-mdl2-recruitment-management", to: "/job" },
  { label: "Screening", icon: "i-hugeicons-task-done-01", to: "/screening" },
  { label: "Requirements", icon: "i-carbon-document-requirements", to: "/requirements" },
  { label: "Settings", icon: "i-mdi-cogs", to: "/settings" },
];