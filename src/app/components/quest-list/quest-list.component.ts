import { Component, OnInit } from '@angular/core';
import { Quest } from '../../models/quest.model';
import { QuestService } from '../../services/quest.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.scss']
})
export class QuestListComponent implements OnInit {
  quests: Quest[] = [];
  
  constructor(
    private questService: QuestService,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.questService.getQuests().subscribe(quests => {
      this.quests = quests;
    });
  }

  completeQuest(quest: Quest): void {
    if (!quest.completed) {
      const completedQuest = this.questService.completeQuest(quest.id);
      if (completedQuest) {
        this.progressService.playQuestCompleteSound();
        const leveledUp = this.progressService.addExperience(completedQuest.experience);
        if (leveledUp) {
          // Could trigger level up animation here
        }
      }
    }
  }

  deleteQuest(questId: string): void {
    this.questService.deleteQuest(questId);
  }
} 