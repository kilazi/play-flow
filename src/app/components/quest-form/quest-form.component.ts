import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestService } from '../../services/quest.service';

@Component({
  selector: 'app-quest-form',
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.scss']
})
export class QuestFormComponent implements OnInit {
  questForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questService: QuestService
  ) {
    this.questForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      experience: [10, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.questForm.valid) {
      this.questService.addQuest({
        title: this.questForm.value.title,
        description: this.questForm.value.description,
        experience: this.questForm.value.experience
      });
      
      this.questForm.reset({
        title: '',
        description: '',
        experience: 10
      });
    }
  }
} 