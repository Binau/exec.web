import { Component, OnInit, Input } from '@angular/core';

import * as myMarked from 'marked';

import highlightjs from 'highlight.js';



@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {

  @Input()
  markdown: string;


  markdownHtml: string;

  constructor() {

  }

  ngOnInit() {
    // Create reference instance
    

    // Set options
    // `highlight` example uses `highlight.js`
    myMarked.setOptions({
      renderer: new myMarked.Renderer(),
      langPrefix: 'language-',
      gfm: true,
      highlight: function(code, lang) {
        if (typeof lang === 'undefined') {
          return highlightjs.highlightAuto(code).value;
        } else if (lang === 'nohighlight') {
          return code;
        } else {
          return highlightjs.highlight(lang, code).value;
        }
      },
      pedantic: false,
      tables: true,
      breaks: true,
      sanitize: true,
      smartLists: true,
      smartypants: true
    });

    this.markdownHtml = myMarked.parse(this.markdown);
  }

}

