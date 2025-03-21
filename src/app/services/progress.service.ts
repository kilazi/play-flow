import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private currentExp = 0;
  private currentLevel = 1;
  private expToNextLevel = 100; // Base exp needed for level 2
  
  private expSubject = new BehaviorSubject<number>(0);
  public exp$ = this.expSubject.asObservable();
  
  private levelSubject = new BehaviorSubject<number>(1);
  public level$ = this.levelSubject.asObservable();
  
  private levelUpSubject = new Subject<number>();
  public levelUp$ = this.levelUpSubject.asObservable();

  constructor(private audioService: AudioService) {}

  /**
   * Add experience points and check for level up
   */
  addExp(exp: number): void {
    this.currentExp += exp;
    this.expSubject.next(this.currentExp);
    
    // Check if level up occurred
    const wasLevelUp = this.checkLevelUp();
    
    // Play appropriate sound
    if (wasLevelUp) {
      // Play level up sound exclusively
      this.audioService.playLevelUpSound();
    } else if (exp > 0) {
      // Only play quest complete sound if exp was gained but no level up
      this.audioService.playQuestCompleteSound();
    }
  }

  /**
   * Check if player leveled up and update level if needed
   * @returns true if level up occurred
   */
  private checkLevelUp(): boolean {
    let leveledUp = false;
    
    while (this.currentExp >= this.expToNextLevel) {
      this.currentExp -= this.expToNextLevel;
      this.currentLevel++;
      this.levelSubject.next(this.currentLevel);
      this.levelUpSubject.next(this.currentLevel);
      
      // Update exp needed for next level (increase by 50% each level)
      this.expToNextLevel = Math.floor(this.expToNextLevel * 1.5);
      
      leveledUp = true;
    }
    
    return leveledUp;
  }

  /**
   * Get current exp progress as percentage toward next level
   */
  getExpPercentage(): number {
    return (this.currentExp / this.expToNextLevel) * 100;
  }

  /**
   * Get current exp
   */
  getCurrentExp(): number {
    return this.currentExp;
  }

  /**
   * Get exp needed for next level
   */
  getExpToNextLevel(): number {
    return this.expToNextLevel;
  }
} 