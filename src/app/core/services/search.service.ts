import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskResponse } from '../models/project-manager.model';
import { HTTPService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchData$$ = new BehaviorSubject<string>('');

  searchString$ = this.searchData$$.asObservable();

  private searchResult$$ = new BehaviorSubject<TaskResponse[]>([]);

  results$ = this.searchResult$$.asObservable();

  constructor(private httpService: HTTPService) { }

  updateSearchData(searchString: string) {
    this.searchData$$.next(searchString);
  }

  updateSearchResult(result: TaskResponse[]) {
    this.searchResult$$.next(result);
  }

  getSearchResult() {
    return this.searchResult$$;
  }
}
