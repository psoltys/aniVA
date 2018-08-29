import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AniQueryService } from '../../shared/ani-query.service';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-voice-actor-search',
  templateUrl: './voice-actor-search.component.html',
  styleUrls: ['./voice-actor-search.component.css']
})
export class VoiceActorSearchComponent implements OnInit {
  private querySubscription: Subscription;
  loading: boolean;
  vaNames: any[];
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(private animeService: AniQueryService,private route:ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterVA(value))
    );
  }

  private _filterVA(value: any): any[] {
    let filterValue = value;
    if(JSON.stringify(value).search("id")!=-1){
      filterValue = value.name.first;
    }
    
    this.querySubscription = this.animeService.GetVA(filterValue)
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.vaNames = data.Page.staff;
      });

    return this.vaNames;
  }

  onTitleClicked(message: any): void{
    let id = message.id;
    this.router.navigate(['voiceactor', id]);
}
displayFn(va: any): string {
  return va? va.name.first + " " + va.name.last : va;
}
}
