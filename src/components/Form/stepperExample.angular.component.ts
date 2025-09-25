// form-stepper.component.ts
import { Component, OnInit } from '@angular/core';
import { Step } from '../stepper/stepper.model';
import { AvailableFormStates, FormStates } from './form-states.model'; // Extract enum/type for clarity

@Component({
  selector: 'app-form-stepper',
  standalone: true,
  imports: [
    StepperComponent,
    StartStepComponent,
    NextStepComponent,
    LastStepComponent,
    CommonModule,
  ],
  template: `
    <ng-container *ngIf="currentFormState.name !== AvailableFormStates.LOADING; else loadingTemplate">
      <app-stepper
        [steps]="steps"
        [initialStepId]="steps[0].id"
        #stepper
      >
        <ng-container *ngIf="currentFormState.name === AvailableFormStates.START">
          <app-start-step (save)="saveStartInfo($event.name, $event.surname)"></app-start-step>
        </ng-container>
        <ng-container *ngIf="currentFormState.name === AvailableFormStates.NEXT">
          <app-next-step [fullName]="currentFormState.fullName"></app-next-step>
        </ng-container>
        <ng-container *ngIf="currentFormState.name === AvailableFormStates.LAST">
          <app-last-step></app-last-step>
        </ng-container>
        <button (click)="stepper.goToPreviousStep()">
          Wstecz
        </button>
        <button (click)="stepper.goToNextStep()">
          Dalej
        </button>
      </app-stepper>
    </ng-container>
    <ng-template #loadingTemplate>
      <div>Ładowanko</div>
    </ng-template>
  `,
})
export class FormStepperComponent implements OnInit {
  AvailableFormStates = AvailableFormStates;

  currentFormState: FormStates = {
    name: AvailableFormStates.LOADING,
  };

  form = {
    name: '',
    surname: '',
  };

  steps: Step[] = [
    {
      id: 'start',
      label: 'Wpisz dane',
      nextStep: 'next',
      beforeStateLoadedAction: () => {
        this.currentFormState = { name: AvailableFormStates.START };
      },
    },
    {
      id: 'next',
      label: 'Upewnij się o danych',
      nextStep: 'koniec',
      previousStep: 'start',
      beforeStateLoadedAction: () => {
        this.currentFormState = {
          name: AvailableFormStates.NEXT,
          fullName: `${this.form.name} ${this.form.surname}`,
        };
      },
    },
    {
      id: 'koniec',
      label: 'Zobacz dane',
      previousStep: 'next',
      beforeStateLoadedAction: () => {
        this.currentFormState = { name: AvailableFormStates.LAST };
      },
    },
  ];

  ngOnInit() {
    // Simulate initial loading state then switch to start step
    setTimeout(() => {
      const startStep = this.steps.find((s) => s.id === 'start');
      if (startStep && startStep.beforeStateLoadedAction) {
        startStep.beforeStateLoadedAction();
      }
    }, 2000);
  }

  saveStartInfo(name: string, surname: string) {
    this.form = { name, surname };
  }
}
