import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CounterComments } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsCounterService {
  private commentsCounter = new Subject<CounterComments>();

  counter = this.commentsCounter.asObservable();

  updateCounter(value: CounterComments) {
    this.commentsCounter.next(value);
  }
}
