import { Component, OnInit } from '@angular/core';
import { tryFunctionOrLogError } from 'apollo-utilities';

enum SearchType {
  va='va',
  anime='anime'
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  myValue: SearchType;
  searchType : typeof SearchType = SearchType;
  vaSearch:boolean;
  animeSearch:boolean;

  constructor() { }

  ngOnInit() {
    this.animeSearch=true;
    this.vaSearch=false;
  }

  setSearch(SearchType:string){
    this.animeSearch=SearchType===this.searchType.anime;
    this.vaSearch=SearchType===this.searchType.va;
  }

}
