<template>
    <div>
        <div>Środkowy krok</div>
        <div>Twoje pełne dane to {{ fullName }}</div>
    </div>
</template>

<script setup lang="ts">
interface IProps {
    fullName: string
}

defineProps<IProps>()
</script>