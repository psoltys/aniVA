import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

const aniQuery = gql`
query($title: String) {
  Page{
  media(search:$title, type: ANIME){
    id
    title{
      romaji
      english
      native
      userPreferred
    }
  }
  }
}`;

const vaQuery = gql`
query ($id: Int, $page: Int) {
  Media(id: $id, type: ANIME) {
    characters(page:$page) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      edges {
        node {
          name {
            first
            last
            native
          }
          image {
            large
            medium
          }
        }
        voiceActors(sort:LANGUAGE) {
          language
          name {
            first
            last
            native
          }
          image {
            large
            medium
          }
        }
      }
    }
  }
}`;


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

  getCharacters(message: any,page:any): QueryRef<any>{
    this.queryRef = this.apollo.watchQuery<any>({
      query: vaQuery,
      variables: {
        id:message,
        page:page
      },
      fetchPolicy: 'network-only',
    });
    return this.queryRef;
}

fetchMore(animeID: any, page:number) {
  this.queryRef.fetchMore({
    // query: ... (you can specify a different query. feedQuery is used by default)
    variables: {
      page: page,
      id:animeID
    },
    // We are able to figure out which offset to use because it matches
    // the feed length, but we could also use state, or the previous
    // variables to calculate this (see the cursor example below)
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


