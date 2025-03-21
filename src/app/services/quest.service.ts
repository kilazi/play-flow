import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quest } from '../models/quest.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private quests: Quest[] = [];
  private questsSubject = new BehaviorSubject<Quest[]>([]);

  constructor() {
    // Load quests from localStorage or initialize with empty array
    this.loadQuests();
  }

  getQuests(): Observable<Quest[]> {
    return this.questsSubject.asObservable();
  }

  addQuest(quest: Omit<Quest, 'id' | 'completed'>): void {
    const newQuest: Quest = {
      id: uuidv4(),
      ...quest,
      completed: false
    };
    
    this.quests.push(newQuest);
    this.saveQuests();
    this.questsSubject.next([...this.quests]);
  }

  completeQuest(id: string): Quest | undefined {
    const quest = this.quests.find(q => q.id === id);
    
    if (quest && !quest.completed) {
      quest.completed = true;
      this.saveQuests();
      this.questsSubject.next([...this.quests]);
      return quest;
    }
    
    return undefined;
  }

  deleteQuest(id: string): void {
    this.quests = this.quests.filter(q => q.id !== id);
    this.saveQuests();
    this.questsSubject.next([...this.quests]);
  }

  private saveQuests(): void {
    localStorage.setItem('wow-quests', JSON.stringify(this.quests));
  }

  private loadQuests(): void {
    const storedQuests = localStorage.getItem('wow-quests');
    if (storedQuests) {
      this.quests = JSON.parse(storedQuests);
      this.questsSubject.next([...this.quests]);
    }
  }
} 