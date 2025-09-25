// start-step.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-step',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <div>Start Step</div>
      <label>
        Imię
        <input [(ngModel)]="name" />
      </label>
      <label>
        Nazwisko
        <input [(ngModel)]="surname" />
      </label>
      <button (click)="onSave()">Zapisz</button>
    </div>
  `,
})
export class StartStepComponent {
  name = '';
  surname = '';

  @Output() save = new EventEmitter<{ name: string; surname: string }>();

  onSave() {
    this.save.emit({ name: this.name, surname: this.surname });
  }
}
