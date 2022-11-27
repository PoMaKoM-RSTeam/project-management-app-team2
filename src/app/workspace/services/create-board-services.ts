import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BoardResponse } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})

export class CreateBoardService {
  private isCreateBoardOpen$$ = new BehaviorSubject<boolean>(false);

  private boards$$ = new Subject<BoardResponse>();

  private owner$$ = new Subject<string>();

  public isCreateBoardOpen$ = this.isCreateBoardOpen$$.asObservable();

  public boards$ = this.boards$$.asObservable();

  public owner$ = this.owner$$.asObservable();

  stateFormBoard(ev:boolean) {
    this.isCreateBoardOpen$$.next(ev);
  }

  updateBoards(formsBoards: BoardResponse) {
    this.boards$$.next(formsBoards);
  }

  getOwner(owner:string) {
    return this.owner$$.next(owner);
  }
}
