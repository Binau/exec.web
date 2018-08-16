import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {ICycleFormation} from '../model/cycle-formation';
import {IFormation} from '../model/formation';

@Injectable({
  providedIn: 'root'
})
export class GestionFormationService {

  constructor( private http: HttpClient) { }

  public async recupererLesCyclesDeFormations(): Promise<ICycleFormation[]> {
    return this.http.get<ICycleFormation[]>( '/rest/cycleFormations').toPromise();
  }

  public async recupererLeCycleDeFormationParSonId(idCycleFormation: string): Promise<ICycleFormation> {
    return this.http.get<ICycleFormation>( `/rest/cycleFormation/${idCycleFormation}`).toPromise();
  }

  public async recupererLesFormationsDUnCycleDeFormations(idCycleFormation: string) : Promise<IFormation[]> {
    return this.http.get<IFormation[]>(`/rest/cycleFormation/formations/${idCycleFormation}`).toPromise();
  }

  recupererUneFormationParSonId(idFormation: string) {
    this.http.get(`/rest/formation/${idFormation}`).subscribe(res => {
    })
  }


}
