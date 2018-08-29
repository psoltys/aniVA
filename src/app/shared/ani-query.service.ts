import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { aniQuery,vaQuery, vaSearch, vaDetail } from './query.graphql';

@Injectable({
  providedIn: 'root'
})
export class AniQueryService {
  queryRef: QueryRef<any>;
  constructor(private apollo: Apollo) { }

  GetAnime(value: any): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: aniQuery,
      variables: {
        title:value,
      },
    })
  }

  GetVA(value: any): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: vaSearch,
      variables: {
        name:value,
      },
    })
  }

  GetVADetails(id: any,page:any): QueryRef<any> {
    this.queryRef =  this.apollo.watchQuery<any>({
      query: vaDetail,
      variables: {
        id:id,
        page:page
      },
      fetchPolicy: 'network-only',
    })
    return this.queryRef;
  }

  getCharacters(id: any,page:any): QueryRef<any>{
    this.queryRef = this.apollo.watchQuery<any>({
      query: vaQuery,
      variables: {
        id:id,
        page:page
      },
      fetchPolicy: 'network-only',
    });
    return this.queryRef;
}

fetchMore(animeID: any, page:number) {
  this.queryRef.fetchMore({
    variables: {
      page: page,
      id:animeID
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      // console.log('FETCH MORE START');
      if (!fetchMoreResult) { return prev; }
      // console.log('FETCH MORE updateQuery() start', fetchMoreResult);
      return fetchMoreResult;
      //console.log('FETCH MORE updateQuery() obj updated', updatedObj);
        },
  }).then(
    () => console.log('FETCH MORE FINISHED')
  );
}

fetchMoreRoles(animeID: any, page:number) {
  this.queryRef.fetchMore({
    variables: {
      page: page,
      id:animeID
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      // console.log('FETCH MORE START');
      if (!fetchMoreResult) { return prev; }
      // console.log('FETCH MORE updateQuery() start', fetchMoreResult);
      return fetchMoreResult;
      //console.log('FETCH MORE updateQuery() obj updated', updatedObj);
        },
  }).then(
    () => console.log('FETCH MORE FINISHED')
  );
}

}


