<script setup lang="ts">
definePageMeta({
    requiredRole: "Admin",
});

useSeoMeta({
    title: "SUPERHURE Departments Module",
    description: "CRUD for Departments",
    ogTitle: "SUPERHURE Departments Module",
    ogDescription: "CRUD for Departments",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
    id: undefined,
    title: undefined,
    status: undefined,
};
const departmentForm = reactive<DepartmentModel>({ ...initialState });
const departmentData = ref<DepartmentModel[]>([]);
const departmentRepo = repository<DepartmentModel>($api, "/department");

const { data, status, error } = await useAPI<DepartmentModel[]>("/department");
if (data.value) {
    departmentData.value = data.value;
}
if (error.value) {
    $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: DepartmentModel) => {
    
    try {
        if (!isUpdate.value) {
            const res = await departmentRepo.add(response); //error on this code
            departmentData.value = [...departmentData.value, res.data as DepartmentModel];
            $toast.success(res.message);
        } else {
            const res = await departmentRepo.update(response); //error on this code
            if (res.data) {
                const data = res.data as DepartmentModel;
                departmentData.value = departmentData.value.map((item) =>
                    item.id === data.id ? data : item
                );
            }

            $toast.success(res.message);
        }
        resetModal();
    } catch (error) {
        return handleApiError(error);
    }
};

const edit = (response: DepartmentModel) => {
    departmentForm.id = response.id;
    departmentForm.status = response.status;
    departmentForm.title = response.title;
    departmentForm.status = response.status;
    updateModal(`${response.title}`);
};

const remove = (id: number) => {
    setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await departmentRepo.delete(id);
                    departmentData.value = departmentData.value.filter(
                        (item) => item.id !== id
                    );
                    $toast.success(response.message);
                } catch (error) {
                    return handleApiError(error);
                }
            }
        }
    );
};

const resetForm = () => {
    Object.assign(departmentForm, initialState);
};

const toggleModal = () => {
    resetForm();
    openModal(`Create Departments`);
};
</script>

<template>
    <Suspense>
        <div>
            <DepartmentForm @data-department="submit" :isUpdate="isUpdate" v-model:state="departmentForm" :title="title"
                v-model:open="isOpen" />
            <div class="flex flex-col items-center lg:items-start mb-3">
                <h2 class="font-extrabold text-2xl">Superior to peer performance departments</h2>
                <span class="text-sm">Here's a list of team leader per departments!</span>
            </div>

            <DepartmentList :data="departmentData" @update="edit" @delete="remove">
                <template #actions>
                    <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal">Add Departments
                    </UButton>
                </template>
            </DepartmentList>
        </div>
        <template #fallback>
            Loading
        </template>
    </Suspense>



</template>
