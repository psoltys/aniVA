import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { AniQueryService } from '../../shared/ani-query.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-anime-search',
  templateUrl: './anime-search.component.html',
  styleUrls: ['./anime-search.component.css']
})
export class AnimeSearchComponent implements OnInit {
  
  private querySubscription: Subscription;
  loading: boolean;
  animeTitles: any[];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(private animeService: AniQueryService,private route:ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterAmino(value))
    );
  }

  private _filterAmino(value: any): any[] {
    let filterValue = value;
    if(JSON.stringify(value).search("id")!=-1){
      filterValue = value.title.romaji;
    }
    
    this.querySubscription = this.animeService.GetAnime(filterValue)
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.animeTitles = data.Page.media;
      });

    return this.animeTitles;
  }

  onTitleClicked(message: any): void{
    let id = message.id;
    this.router.navigate(['anime', id]);
}
displayFn(anime: any): string {
  return anime? anime.title.userPreferred : anime;
}
}
