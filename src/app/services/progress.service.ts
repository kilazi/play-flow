import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProgress } from '../models/user-progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private PROGRESS_STORAGE_KEY = 'wow-user-progress';
  private userProgress: UserProgress = {
    level: 1,
    currentExp: 0,
    expToNextLevel: 100
  };
  private progressSubject = new BehaviorSubject<UserProgress>(this.userProgress);
  private levelSound: HTMLAudioElement;
  private questCompleteSound: HTMLAudioElement;

  constructor() {
    this.loadProgress();
    this.levelSound = new Audio('assets/sounds/level-up.mp3');
    this.questCompleteSound = new Audio('assets/sounds/quest-complete.mp3');
  }

  getUserProgress(): Observable<UserProgress> {
    return this.progressSubject.asObservable();
  }

  addExperience(exp: number): boolean {
    let leveledUp = false;
    this.userProgress.currentExp += exp;

    // Check if user leveled up
    while (this.userProgress.currentExp >= this.userProgress.expToNextLevel) {
      this.userProgress.currentExp -= this.userProgress.expToNextLevel;
      this.userProgress.level++;
      this.userProgress.expToNextLevel = this.calculateExpForNextLevel(this.userProgress.level);
      leveledUp = true;
      this.playLevelUpSound();
    }

    this.saveProgress();
    this.progressSubject.next({ ...this.userProgress });
    return leveledUp;
  }

  playQuestCompleteSound(): void {
    this.questCompleteSound.play();
  }

  private playLevelUpSound(): void {
    this.levelSound.play();
  }

  private calculateExpForNextLevel(level: number): number {
    // Simple formula: each level requires 10% more XP than the previous one
    return Math.floor(100 * Math.pow(1.1, level - 1));
  }

  private loadProgress(): void {
    const storedProgress = localStorage.getItem(this.PROGRESS_STORAGE_KEY);
    if (storedProgress) {
      this.userProgress = JSON.parse(storedProgress);
      this.progressSubject.next({ ...this.userProgress });
    }
  }

  private saveProgress(): void {
    localStorage.setItem(this.PROGRESS_STORAGE_KEY, JSON.stringify(this.userProgress));
  }
} 