// middle-step.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-middle-step',
  standalone: true,
  template: `
    <div>
      <div>Środkowy krok</div>
      <div>Twoje pełne dane to {{ fullName }}</div>
    </div>
  `,
})
export class MiddleStepComponent {
  @Input() fullName!: string;
}
