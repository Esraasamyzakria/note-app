import { Pipe, PipeTransform } from '@angular/core';
import { Inotes } from '../interfaces/notes/inotes';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allnotes:Inotes[],term:string): Inotes[] {
    return allnotes.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()) );
  }

}
