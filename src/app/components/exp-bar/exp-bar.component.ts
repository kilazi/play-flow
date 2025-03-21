import { Component, OnInit } from '@angular/core';
import { UserProgress } from '../../models/user-progress.model';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-exp-bar',
  templateUrl: './exp-bar.component.html',
  styleUrls: ['./exp-bar.component.scss']
})
export class ExpBarComponent implements OnInit {
  userProgress: UserProgress = {
    level: 1,
    currentExp: 0,
    expToNextLevel: 100
  };
  expPercentage = 0;

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.progressService.getUserProgress().subscribe(progress => {
      this.userProgress = progress;
      this.expPercentage = (this.userProgress.currentExp / this.userProgress.expToNextLevel) * 100;
    });
  }
} 