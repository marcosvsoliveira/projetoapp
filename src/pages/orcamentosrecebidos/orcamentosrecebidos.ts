import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-orcamentosrecebidos',
  templateUrl: 'orcamentosrecebidos.html',
})
export class OrcamentosrecebidosPage {

  carga: Observable<any[]>;
  private cargaPath = 'orcamento/carga/';

  pessoa: Observable<any[]>;
  private pessoaPath = 'orcamento/pessoa/';

  excursao: Observable<any[]>;
  private excursaoPath = 'orcamento/excursao/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AngularFireAuth,
              public db: AngularFireDatabase) {

                this.carga = this.getAllCarga();
                this.pessoa = this.getAllPessoa();
                this.excursao = this.getAllExcursao();
  }

  getAllCarga(){
    return this.db.list(this.cargaPath)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.key, ...c.payload.val() }));
    })
  }

  getAllPessoa(){
    return this.db.list(this.pessoaPath)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.key, ...c.payload.val() }));
    })
  }

  getAllExcursao(){
    return this.db.list(this.excursaoPath)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.key, ...c.payload.val() }));
      })
  }
}
