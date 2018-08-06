import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApolloModule} from 'apollo-angular';
import {HttpLinkModule} from 'apollo-angular-link-http';
@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule
  ],
  declarations: []
})
export class SharedModule {
  
 }
