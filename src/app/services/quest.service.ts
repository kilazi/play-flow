import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quest } from '../models/quest.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private QUESTS_STORAGE_KEY = 'wow-quests';
  private quests: Quest[] = [];
  private questsSubject = new BehaviorSubject<Quest[]>([]);

  constructor() {
    this.loadQuests();
  }

  getQuests(): Observable<Quest[]> {
    return this.questsSubject.asObservable();
  }

  addQuest(quest: Omit<Quest, 'id' | 'completed' | 'createdAt'>): Quest {
    const newQuest: Quest = {
      id: uuidv4(),
      name: quest.name,
      description: quest.description,
      experience: quest.experience,
      completed: false,
      createdAt: new Date()
    };

    this.quests.push(newQuest);
    this.saveQuests();
    this.questsSubject.next([...this.quests]);
    return newQuest;
  }

  updateQuest(updatedQuest: Quest): void {
    const index = this.quests.findIndex(quest => quest.id === updatedQuest.id);
    if (index !== -1) {
      this.quests[index] = updatedQuest;
      this.saveQuests();
      this.questsSubject.next([...this.quests]);
    }
  }

  completeQuest(questId: string): Quest | null {
    const quest = this.quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      quest.completed = true;
      this.saveQuests();
      this.questsSubject.next([...this.quests]);
      return quest;
    }
    return null;
  }

  deleteQuest(questId: string): void {
    this.quests = this.quests.filter(quest => quest.id !== questId);
    this.saveQuests();
    this.questsSubject.next([...this.quests]);
  }

  private loadQuests(): void {
    const storedQuests = localStorage.getItem(this.QUESTS_STORAGE_KEY);
    if (storedQuests) {
      this.quests = JSON.parse(storedQuests);
      this.questsSubject.next([...this.quests]);
    }
  }

  private saveQuests(): void {
    localStorage.setItem(this.QUESTS_STORAGE_KEY, JSON.stringify(this.quests));
  }
} 