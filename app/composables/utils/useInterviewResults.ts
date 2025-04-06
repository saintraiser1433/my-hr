// In your composables or utils
export const useInterviewResults = () => {
  const config = {
    schoolName: 'SEAIT School',
    contactEmail: 'hr@seait.edu',
    contactPhone: '+63 2 1234 5678'
  };

  const templates = {
    passed: (details: {
      name: string;
      position: string;
      startDate?: string;
      hrContact?: string;
    }) => 
    `Dear ${details.name},\n\n` +
    `Congratulations! You've passed all stages for the ${details.position} role at ${config.schoolName}.\n\n` +
    `${details.startDate ? `Onboarding begins ${details.startDate}. ` : ''}` +
    `HR Team will contact you within 48h.\n\n` +
    `Welcome to the team!\n\n` +
    `Best regards,\n` +
    `Academic Hiring Panel\n` +
    `${config.schoolName}`,

    failed: (details: {
      name: string;
      position: string;
      feedback?: string;
    }) => `Dear ${details.name},\n\n` +
    `Thank you for participating in the interview process for the ${details.position} ` +
    `at ${config.schoolName}. After thorough consideration, we have decided to proceed ` +
    `with candidates whose qualifications more closely match our current needs.\n\n` +
    `${details.feedback ? `Feedback: ${details.feedback}\n\n` : ''}` +
    `We appreciate your interest in our institution and encourage you to apply for ` +
    `future openings that align with your profile.\n\n` +
    `Wishing you success in your professional endeavors.\n\n` +
    `Best regards,\n` +
    `Academic Hiring Panel\n` +
      `${config.schoolName}`
  };

  return { templates };
};