import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CreateBoardService } from 'src/app/workspace/services/create-board-services';
import { GetUsersServices } from 'src/app/workspace/services/get-users-services';
import { HTTPService } from '../../services/http.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSearch = true;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private createFormService: CreateBoardService,
    private httpService: HTTPService,
    private getUsersServices: GetUsersServices,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSearch = event.url.includes('workspace');
        this.navigationService.updateUrl(event.url);
      }
    });
  }

  createForm() {
    this.createFormService.stateFormBoard(true);
    this.httpService.getAllUsers().subscribe((user) => {
      this.getUsersServices.getUsers(user);
    });
  }
}
