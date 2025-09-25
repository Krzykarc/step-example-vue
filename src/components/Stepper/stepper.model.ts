interface Step {
    id: string,
    label: string,
    beforeStateLoadedAction?: () => void,
    nextStep?: Step['id'],
    previousStep?: Step['id'],
}

export type {
    Step
}