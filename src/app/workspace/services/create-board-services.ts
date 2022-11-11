import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BoardDTO } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})

export class CreateBoardService {
  private isCreateBoardOpen$$ = new BehaviorSubject<boolean>(false);

  private boards$$ = new Subject<BoardDTO>();

  public isCreateBoardOpen$ = this.isCreateBoardOpen$$.asObservable();

  public boards$ = this.boards$$.asObservable();

  stateFormBoard(ev:boolean) {
    this.isCreateBoardOpen$$.next(ev);
  }

  updateBoards(formsBoards: BoardDTO) {
    this.boards$$.next(formsBoards);
  }
}
