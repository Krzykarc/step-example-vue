<template>
    <div>
        <div>Start Step</div>
        <label>
            Imię
            <input v-model="name" />
        </label>
        <label>
            Nazwisko
            <input v-model="surname" />
        </label>
        <button @click="emit('save', name, surname)">Zapisz</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IEmits {
    save: [name: string, surname: string]
}

const emit = defineEmits<IEmits>()

const name = ref<string>('')
const surname = ref<string>('')
</script>