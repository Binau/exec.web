import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  md: string;

  constructor() { }

  ngOnInit() {

this.md =` 
# Titre 1
## Sous titre 1
Du code Javascript :
\`\`\`js
var foo = [1,2,3];

var obj = {
	foo		// means \`foo: foo\`
};

obj.foo;	// [1,2,3]
\`\`\`
`;

  }

}