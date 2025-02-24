export const MENU_ITEMS: MenuItem[] = [
    { label: "Dashboard", icon: "i-tabler-device-analytics", to: "/" },
    { label: "Applicants", icon: "i-tdesign-user-filled", to: "/applicants" },
    { label: "Employees", icon: "i-clarity-employee-group-solid", to: "/employees" },
    {
      label: "Organization",
      icon: "i-fluent-organization-12-filled",
      slot:"components",
      children: [
        { label: "Departments", icon: "i-game-icons-organigram", to: "/organization/department" },
        { label: "Team Lead", icon: "i-ri-team-fill", to: "/organization/teamlead" },
      ],
    },
    {
      label: "Evaluation",
      icon: "i-mdi-file-graph",
      slot:"components",
      children: [
        { label: "Evaluation Question", icon: "i-hugeicons-question", to: "/evaluation/question" },
        { label: "Manage Evaluation", icon: "i-mingcute-user-question-fill", to: "/evaluation/manage" },
      ],
    },
    {
      label: "Performance",
      icon: "i-mdi-graph-line",
      slot:"components",
      children: [
        { label: "P2P Performance", icon: "i-hugeicons-peer-to-peer-02", to: "/performance/peer" },
        { label: "SE Performance", icon: "i-hugeicons-peer-to-peer-03", to: "/performance/superior" },
      ],
    },
    {
      label: "Screening",
      icon: "i-fluent-task-list-square-16-regular",
      slot:"components",
      children: [
        { label: "Manage Screening", icon: "i-hugeicons-task-done-01", to: "/screening/manage" },
        { label: "Assign Job Screening", icon: "i-fluent-task-list-add-20-filled", to: "/screening/assign" },
      ],
    },
    { label: "Recruitment", icon: "i-fluent-mdl2-recruitment-management", to: "/recruitment" },
    { label: "Requirements", icon: "i-carbon-document-requirements", to: "/requirements" },
    { label: "Settings", icon: "i-mdi-cogs", to: "/settings" },
  ];