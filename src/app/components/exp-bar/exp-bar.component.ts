import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressService } from '../../services/progress.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-exp-bar',
  templateUrl: './exp-bar.component.html',
  styleUrls: ['./exp-bar.component.scss']
})
export class ExpBarComponent implements OnInit, OnDestroy {
  expPercentage: number = 0;
  currentExp: number = 0;
  expToNextLevel: number = 100;
  currentLevel: number = 1;
  
  private subscriptions = new Subscription();

  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    // Use the new observables from ProgressService
    this.subscriptions.add(
      combineLatest([
        this.progressService.exp$,
        this.progressService.level$
      ]).subscribe(([exp, level]) => {
        this.currentExp = exp;
        this.currentLevel = level;
        this.expToNextLevel = this.progressService.getExpToNextLevel();
        this.expPercentage = this.progressService.getExpPercentage();
      })
    );
    
    // Subscribe to level up events if needed
    this.subscriptions.add(
      this.progressService.levelUp$.subscribe(newLevel => {
        console.log(`Leveled up to ${newLevel}!`);
        // Any additional level up UI logic can go here
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
} 