import { Pipe, PipeTransform } from '@angular/core';
import { Technologie } from '../components/models/Technologies';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(technologies: Technologie[], ring: string, category: string) {
    return technologies.filter(technologie => technologie.ring?.indexOf(ring) !== -1 && technologie.category?.indexOf(category) !== -1);
  }

}
