import { Component, OnInit } from '@angular/core';
import { AniQueryService } from '../../shared/ani-query.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';
import { validate } from 'graphql';
import { switchMap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-va-search',
  templateUrl: './va-search.component.html',
  styleUrls: ['./va-search.component.css']
})
export class VaSearchComponent implements OnInit {

  private querySubscription: Subscription;
  loading: boolean;
  id: string;
  animeCharacters: Observable<any[]>;
  animeVAs: Observable<any[]>;
  navigationSubscription;

  constructor(private animeService: AniQueryService,
    private route: ActivatedRoute,
    private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {

        this.ngOnInit();
      }
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    console.log("dupa:::" + this.id)
    this.vaSearch(this.id)
  }

  // ngOnChanges() { this.ngOnInit() }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  onBack(): void {
    this.router.navigate(['']);
  }

  vaSearch(animeID: any) {
    console.log(animeID);
    this.querySubscription = this.animeService.getCharacters(animeID)
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.animeCharacters = data.Media.characters.edges;
        this.animeVAs = data.Media.characters.edges.voiceActors;
        console.log(this.animeCharacters);

      });
  }

}
