import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { User } from 'src/app/entitys/user';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  goods: string[] = ['a','b','c','d'];
  ngOnInit() {
    
  }



  
  // myControl = new FormControl();
  // options: user[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  // filteredOptions?: Observable<user[]>;

  // ngOnInit() {
  //   this.filteredOptions = this.myControl.valueChanges.pipe(
  //     startWith(''),
  //     map(value => (typeof value === 'string' ? value : value.name)),
  //     map(name => (name ? this._filter(name) : this.options.slice())),
  //   );
  // }

  // displayFn(user: user): string {
  //   return '';
    
  // }

  // private _filter(name: string): user[] {
  //   const filterValue = name.toLowerCase();

  //   return this.options.filter(option => option.name?.toLowerCase().includes(filterValue));
  // }
}

