export function useUpdateStatus(ongoingData: Ref<OngoingApplicantDetails[]>) {

  const { $api, $toast } = useNuxtApp();
  const ISRepo = repository<InterviewStatus>($api, "/interview/status");
  const updateStatus = async (data: InterviewStatus) => {
    try {
      const response = await ISRepo.update(data);
      if (!ongoingData.value?.[0]?.progressList) return;

      const firstOngoingData = ongoingData.value[0];

      firstOngoingData.progressList = firstOngoingData.progressList?.map((item) => {
        if (item.id === data.id) {
          if (item.status === ApplicationStatus.PENDING) {
            if (typeof firstOngoingData.countApplicantScreening === 'number') {
              firstOngoingData.countApplicantScreening += 1;
            }
          }
          return { ...item, status: response.data?.status as ApplicationStatus };
        }
        return item;
      });

      // Recalculate currentStage, nextStep, and nextSched
      const sortedProgressList = firstOngoingData.progressList ?? [];

      let currentStage: string | null = null;
      let nextStep: string | null = null;
      let nextSched: string | null | undefined = null;

      for (let i = 0; i < sortedProgressList.length; i++) {
        const screening = sortedProgressList[i];
        if (screening?.status === ApplicationStatus.PENDING) {
          if (!currentStage) {
            currentStage = screening.screening.title;
          } else if (!nextStep) {
            nextStep = screening.screening.title;
            nextSched = typeof screening.dateInterview === 'string'
              ? screening.dateInterview
              : screening.dateInterview?.toISOString() || null;
            break;
          }
        }
      }

      // Update remarks
      const allPassed = sortedProgressList.every((item) => item.status === ApplicationStatus.PASSED);
      if (allPassed) {
        firstOngoingData.remarks = ApplicationStatus.PASSED;
      } else if (response.data?.status === ApplicationStatus.PASSED && !allPassed) {
        firstOngoingData.remarks = ApplicationStatus.ONGOING;
      } else if (response.data?.status === ApplicationStatus.FAILED) {
        firstOngoingData.remarks = ApplicationStatus.FAILED;
      } else {
        firstOngoingData.remarks = ApplicationStatus.ONGOING;
      }

      firstOngoingData.currentStage = currentStage;
      firstOngoingData.nextStep = nextStep;
      firstOngoingData.nextSched = nextSched || null;

      $toast.success(response.message);
    } catch (err: any) {
      $toast.error(err.data?.details || 'An error occurred');
    }
  };


  //update Time



  return { updateStatus };



}