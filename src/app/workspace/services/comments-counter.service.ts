import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface CounterComments {
  taskId: string;
  count: number;
}

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
