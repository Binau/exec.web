import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  md: string;
  md2: string;
  md3: string;

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

this.md2 =` 
# Titre 1
## Sous titre 1
Du code JAVA :
\`\`\`java
class ClasseMain{

  public static void main(String[] args){ 
    //Vos données, variables, différents traitements…
  }//Fin de la méthode main

}//Fin de votre classe
\`\`\`
`;

this.md3 =` 
# Titre 1
## Sous titre 1
Du code PYTHON :
\`\`\`python
maListeDeMeubles = ['table','chaise','frigo']
maListeDeMeubles.sort()  #Tri de la liste
for unMeuble in maListeDeMeubles:
   print('longueur de la chaîne ', unMeuble, '=', len(unMeuble))

#les listes imbriquées:
laListeDesNombresPairs = [ unNombre for unNombre in xrange(1000) if unNombre % 2 == 0]

#Les dictionnaires :
unAnnuaire = {'Laurent': 6389565, 'Paul': 6356785}
for unNom, x in unAnnuaire.items():
   print("le nom %s a pour numéro de téléphone %d" %(unNom, x))


#Les tuples (n-uplet) : séquence constante
Couleur = ('Rouge', 'Bleu', 'Vert')
print(Couleur[0], Couleur[1],  Couleur[2])

PointDeReference = (100, 200)
print(" x0 = %d   y0 = %d "  %(PointDeReference[0],PointDeReference[1]))
\`\`\`
`;

  }

}
