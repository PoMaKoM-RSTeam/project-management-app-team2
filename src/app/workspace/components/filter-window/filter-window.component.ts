import {
  Component, OnInit,
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-filter-window',
  templateUrl: './filter-window.component.html',
  styleUrls: ['./filter-window.component.scss'],
})
export class FilterWindowComponent implements OnInit {
  filterForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      filter: new FormControl('', [
      ]),
    });
    this.filterForm.get('filter')!.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe((searchString: string) => {
      console.log(searchString);
    });
  }
}
