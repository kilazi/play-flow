import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>{{ title }}</h1>
      <app-quest-form></app-quest-form>
      <app-quest-list></app-quest-list>
      <app-exp-bar></app-exp-bar>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #3F51B5;
    }
  `]
})
export class AppComponent {
  title = 'WoW Task Manager';
} 