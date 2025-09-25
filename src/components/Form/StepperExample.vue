<template>
    <Stepper :steps="steps" :initial-step-id="steps[0].id" v-if="currentFormState.name !== AvailableFormStates.LOADING">
        <template #default="actions">
            <StartStep
              v-if="currentFormState.name === AvailableFormStates.START"
              @save="saveStartInfo"
            />
            <NextStep
              v-if="currentFormState.name === AvailableFormStates.NEXT"
              :full-name="currentFormState.fullName"
            />
            <LastStep v-if="currentFormState.name === AvailableFormStates.LAST"/>
            <button @click="actions.goToPreviousStep()">
                Wstecz
            </button>
            <button @click="actions.goToNextStep()">
                Dalej
            </button>
        </template>
    </Stepper>
    <div v-else-if="currentFormState.name === AvailableFormStates.LOADING">
        Ładowanko
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Stepper from '../Stepper/Stepper.vue';
import type { Step } from '../Stepper/stepper.model'

import StartStep from './StartStep.vue';
import NextStep from './NextStep.vue';
import LastStep from './LastStep.vue';

const form = ref({
    name: '',
    surname: '',
})

setTimeout(() => {
    currentFormState.value = {
        name: AvailableFormStates.START
    }
}, 2000)

const steps: Step[] = [
    {
        id: 'start',
        label: "Wpisz dane",
        nextStep: 'next',
        beforeStateLoadedAction: () => {
            currentFormState.value = {
                name: AvailableFormStates.START
            }
        }
    },
    {
        id: 'next',
        label: "Upewnij się o danych",
        nextStep: 'koniec',
        previousStep: 'start',
        beforeStateLoadedAction: () => {
            currentFormState.value = {
                name: AvailableFormStates.NEXT,
                fullName: `${form.value.name} ${form.value.surname}`
            }
        }
    },
    {
        id: 'koniec',
        label: "Zobacz dane",
        previousStep: 'next',
        beforeStateLoadedAction: () => {
            currentFormState.value = {
                name: AvailableFormStates.LAST
            }
        }
    },
]

enum AvailableFormStates {
    LOADING = "LOADING",
    START = "START",
    NEXT = "NEXT",
    LAST = "LAST"
}

type FormStates = {
    name: AvailableFormStates.LOADING
} | {
    name: AvailableFormStates.START,
} | {
    name: AvailableFormStates.NEXT,
    fullName: string,
} | {
    name: AvailableFormStates.LAST
}

const currentFormState = ref<FormStates>({
    name: AvailableFormStates.LOADING
})

const saveStartInfo = (name: string, surname: string) => {
    form.value = {
        name,
        surname,
    }
}
</script>