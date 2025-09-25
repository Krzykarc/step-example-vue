<template>
    <div>
        <div>{{ currentStep.label }}</div>
        <slot
          :goToNextStep="goToNextStep"
          :goToPreviousStep="goToPreviousStep"
          :changeStep="changeStep"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

import type { Step } from "./stepper.model"


interface IProps {
    initialStepId: Step['id']
    steps: Step[]
}

const props = defineProps<IProps>();

const currentStepId = ref(props.initialStepId)

const currentStep = computed<Step>(() => {
    const activeStep = props.steps.find((step) => step.id === currentStepId.value)

    if(!activeStep) {
        throw new Error(`Make sure you passed currect step ids, active step id ${currentStepId.value} not found in defined steps`)
    }

    return activeStep
})

const changeStep = (newStepId: Step['id']) => {
    currentStepId.value = newStepId
    currentStep.value.beforeStateLoadedAction?.()
}

const goToNextStep = () => {
    if(!currentStep.value.nextStep) {
        throw new Error('You are on the last step, can\'t go futher')
    }
    changeStep(currentStep.value.nextStep)
}

const goToPreviousStep = () => {
    if(!currentStep.value.previousStep) {
        throw new Error('You are on the first step, can\'t go back')
    }
    changeStep(currentStep.value.previousStep)
}
</script>