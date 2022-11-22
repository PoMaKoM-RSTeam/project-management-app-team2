import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HTTPService } from '../../services/http.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  userId = '';

  disabled = true;

  constructor(
    private fb: UntypedFormBuilder,
    private httpService: HTTPService,
    private searchService: SearchService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      search: [null, []],
    });

    this.authService.userId$.subscribe((data) => {
      this.userId = data;
    });

    this.validateForm.get('search')!.valueChanges.pipe(
      /*       filter((item: string) => item!.length >= 2), */
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((searchString: string) => {
      this.searchService.updateSearchData(searchString);
      this.httpService.getTasksSet([''], this.userId, searchString).subscribe((data) => {
        this.searchService.updateSearchResult(data);
      });
      if (searchString.length !== 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    });
  }

  submitForm(): void {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  clearInput() {
    this.validateForm.reset();
    this.searchService.updateSearchData('');
    this.searchService.updateSearchResult([]);
    this.disabled = true;
  }
}
