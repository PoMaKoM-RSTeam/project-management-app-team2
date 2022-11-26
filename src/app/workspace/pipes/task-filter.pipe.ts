import { Pipe, PipeTransform } from '@angular/core';
import { TaskResponse } from 'src/app/core/models/project-manager.model';

@Pipe({
  name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
  transform(value: TaskResponse[] | undefined, filterValue: string): any {
    if (value) {
      const tasks = [...value];
      if (filterValue.length === 0) {
        return value;
      }
      return tasks.filter((data) => (data.title + data.description).toLowerCase()
        .includes(filterValue));
    }
    return value;
  }
}
