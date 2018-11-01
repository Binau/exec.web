import {NgModule} from '@angular/core';
import {CommonModule as ngCommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MarkdownComponent} from './component/markdown/markdown.component';
import {CodeMirrorComponent} from './component/code-mirror/code-mirror.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../../../environments/environment';
import {FilesEditorComponent} from './component/files-editor/files-editor.component';
import { TabPanelComponent } from './component/tab-panel/tab-panel.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  exports: [
    // Angular
    // ngCommonModule,
    FormsModule,
    // BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Projet
    CodeMirrorComponent,
    MarkdownComponent,
    FilesEditorComponent,
    TabPanelComponent,

  ],
  providers: [
    environment.wsService
  ],
  declarations: [
    CodeMirrorComponent,
    MarkdownComponent,
    FilesEditorComponent,
    TabPanelComponent,
  ]
})
export class CommonModule {
}
