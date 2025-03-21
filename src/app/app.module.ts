import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestListComponent } from './components/quest-list/quest-list.component';
import { QuestFormComponent } from './components/quest-form/quest-form.component';
import { ExpBarComponent } from './components/exp-bar/exp-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestListComponent,
    QuestFormComponent,
    ExpBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 