import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardDTO } from 'src/app/core/models/project-manager.model';
import { HTTPService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root',
})

export class CreateBoardService {
  private isCreateBoardOpen$$ = new BehaviorSubject<boolean>(false);

  public isCreateBoardOpen$ = this.isCreateBoardOpen$$.asObservable();

  constructor(private httpService:HTTPService) {}

  stateFormBoard(ev:boolean) {
    this.isCreateBoardOpen$$.next(ev);
  }

  postBoard(formBoard: BoardDTO) {
    this.httpService.createBoard(formBoard);
    this.httpService.getAllBoards().subscribe((e) => console.log(e, 'e'));
    console.log(formBoard, 'form');
  }
}
