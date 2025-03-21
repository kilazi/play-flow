import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestService } from '../../services/quest.service';

@Component({
  selector: 'app-quest-form',
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.scss']
})
export class QuestFormComponent {
  questForm: FormGroup;
  isEditing = false;
  currentQuestId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private questService: QuestService
  ) {
    this.questForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      experience: [10, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.questForm.invalid) {
      return;
    }

    if (this.isEditing && this.currentQuestId) {
      // Update existing quest logic
    } else {
      // Add new quest
      this.questService.addQuest({
        name: this.questForm.value.name,
        description: this.questForm.value.description,
        experience: this.questForm.value.experience
      });
      this.questForm.reset({
        name: '',
        description: '',
        experience: 10
      });
    }
  }
} 