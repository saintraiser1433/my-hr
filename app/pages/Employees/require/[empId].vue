<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Screening Type Module",
  description: "CRUD for Screening Type",
  ogTitle: "SUPERHURE Screening Type Module",
  ogDescription: "CRUD for Screening Type",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { updateModal, resetModal, isOpen, title } = useCustomModal();
const route = useRoute();
const titleName = useState("title", () => localStorage.getItem("title") || "Unknown module");
const requirementsData = ref<EmployeeRequirements[]>([]);
const listRequirements = ref<UnchosenRequirements[]>([]);


const initialState = {
  id: undefined,
  submittedAt: undefined,
  expiryDate: undefined,
  status: EmployeeRequirementStatus.PENDING,
};
const departmentForm = reactive<SubmittedRequirements>({ ...initialState });
//jobscreen list
const { data, status, error } = await useAPI<EmployeeWithRequirementModel>(
  `/employees/req/${route.params.empId}`
);
if (data.value) {
  requirementsData.value = data.value.employeeRequirements;
  listRequirements.value = data.value.unchosenRequirements;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const assignRequireRepo = repository<EmployeeRequirements[]>($api, "/employees/assign");
const assignData = async (data: UnchosenRequirements[]) => {
  try {
    const payload = data.map((item) => ({
      employeeId: Number(route.params.empId),
      requirementsId: Number(item.id),
      status: EmployeeRequirementStatus.PENDING,
    }));
    const response = await assignRequireRepo.add(payload);
    requirementsData.value = [...requirementsData.value, ...response.data as EmployeeRequirements[]];
    listRequirements.value =
      listRequirements.value?.filter((item) => !data.some((items) => items.id === item.id)) ||
      [];
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};

const UnassignRequireRepo = repository<UnchosenRequirements[]>($api, "/employees/assign/delete");
const unAssignJob = (data: number[]) => {
  setAlert("warning", "Are you sure you want to remove?", "", "Confirm remove").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await UnassignRequireRepo.deleteMany(data);
          listRequirements.value = [...listRequirements.value, ...response.data as UnchosenRequirements[]];
          requirementsData.value = requirementsData.value.filter(
            (item) => !data.includes(item.id || 0)
          );
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};

const submissionRepo = repository<SubmittedRequirements>($api, "/employees/status");
const updateSubmission = async (response: SubmittedRequirements) => {
  const res = await submissionRepo.update(response); //error on this code
  const datas = res.data as EmployeeRequirements;
  requirementsData.value = requirementsData.value.map((item) =>
    item.id === response.id ? { ...item, ...datas } : item
  );
  resetModal();
  $toast.success(res.message);
}


const edit = (data: EmployeeRequirements) => {
  departmentForm.id = data.id;
  departmentForm.expiryDate = data.expiryDate;
  departmentForm.submittedAt = data.submittedAt;
  updateModal(`Submit Requirements`);
}

const pending = (response: EmployeeRequirements) => {
  setAlert("warning", "Are you sure you want to update this into pending?", "", "Confirm to update").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await submissionRepo.update(response); //error on this code
          const datas = res.data as EmployeeRequirements;
          requirementsData.value = requirementsData.value.map((item) =>
            item.id === response.id ? { ...item, ...datas } : item
          );
          $toast.success(res.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
}
</script>

<template>
  <EmployeeFormRequire @data-requirement="updateSubmission" v-model:state="departmentForm" v-model:open="isOpen"
    :title="title"></EmployeeFormRequire>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl capitalize">{{ titleName }}</h2>
    <span class="text-sm">Here's a list assigned screening type for {{ titleName }} !</span>
  </div>

  <EmployeeRequireList @pending="pending" @update="edit" @assign="assignData" @unAssign="unAssignJob"
    :data="requirementsData" :items="listRequirements">
  </EmployeeRequireList>
</template>
