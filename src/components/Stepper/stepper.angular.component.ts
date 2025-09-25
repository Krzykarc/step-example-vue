// stepper.component.ts
import { Component, Input } from '@angular/core';

export interface Step {
  id: string | number;
  label: string;
  nextStep?: string | number;
  previousStep?: string | number;
  beforeStateLoadedAction?: () => void;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  template: `
    <div>
      <div>{{ currentStep.label }}</div>
      <ng-content></ng-content>
    </div>
  `,
})
export class StepperComponent {
  @Input() initialStepId!: Step['id'];
  @Input() steps: Step[] = [];

  currentStepId!: Step['id'];

  ngOnInit() {
    if (!this.initialStepId) {
      throw new Error('initialStepId input is required');
    }
    this.currentStepId = this.initialStepId;
  }

  get currentStep(): Step {
    const step = this.steps.find((s) => s.id === this.currentStepId);
    if (!step) {
      throw new Error(`Active step id ${this.currentStepId} not found in steps`);
    }
    return step;
  }

  changeStep(newStepId: Step['id']) {
    this.currentStepId = newStepId;
    this.currentStep.beforeStateLoadedAction?.();
  }

  goToNextStep() {
    if (!this.currentStep.nextStep) {
      throw new Error("You are on the last step, can't go further");
    }
    this.changeStep(this.currentStep.nextStep);
  }

  goToPreviousStep() {
    if (!this.currentStep.previousStep) {
      throw new Error("You are on the first step, can't go back");
    }
    this.changeStep(this.currentStep.previousStep);
  }
}
