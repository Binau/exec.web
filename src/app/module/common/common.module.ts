import {NgModule} from '@angular/core';
import {CommonModule as ngCommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CodeMirrorComponent} from './component/code-mirror.component';
import {MarkdownComponent} from './component/markdown/markdown.component';


@NgModule({
  imports: [],
  exports: [
    // Angular
    ngCommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    // Projet
    CodeMirrorComponent,
    MarkdownComponent,

  ],
  declarations: [
    CodeMirrorComponent,
    MarkdownComponent,
  ]
})
export class CommonModule {
}
