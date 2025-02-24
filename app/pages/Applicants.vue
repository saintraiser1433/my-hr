<script setup lang="ts">
import { Test } from '#components'

const count = ref(0)

const toast = useToast()
const modal = useModal()

function open() {
  count.value++

  modal.open(Test, {
    description: 'And you can even provide a description!',
    count: count.value,
    onSuccess() {
      toast.add({
        title: 'Success !',
        id: 'modal-success'
      })
    }
  })
}
</script>

<template>
  <UButton label="Open" color="neutral" variant="subtle" @click="open" />
</template>

