import { Component } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  searchResult = this.searchService.getSearchResult();

  constructor(private searchService: SearchService, public translate: TranslateService) { }
}
