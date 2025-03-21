import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quest } from '../../models/quest.model';
import { QuestService } from '../../services/quest.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.scss']
})
export class QuestListComponent implements OnInit, OnDestroy {
  quests: Quest[] = [];
  private subscription = new Subscription();
  
  constructor(
    private questService: QuestService,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.questService.getQuests().subscribe(quests => {
        this.quests = quests;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  completeQuest(id: string): void {
    const completedQuest = this.questService.completeQuest(id);
    
    if (completedQuest) {
      this.progressService.addExp(completedQuest.experience);
    }
  }

  deleteQuest(id: string): void {
    this.questService.deleteQuest(id);
  }
} 