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
    }) => `Dear ${details.name},\n\n` +
    `On behalf of ${config.schoolName}, I am delighted to inform you that you have ` +
    `successfully passed all stages of our selection process for the ${details.position} position.\n\n` +
    `${details.startDate ? `Your onboarding will begin on ${details.startDate}. ` : ''}` +
    `Our HR department ${details.hrContact || config.contactEmail} will contact you ` +
    `within 48 hours with further instructions.\n\n` +
    `Welcome to our team!\n\n` +
    `Sincerely,\n` +
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