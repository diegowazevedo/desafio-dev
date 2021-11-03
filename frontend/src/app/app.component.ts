import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  fileName = '';
  lojas: any = null;
  /* [
    {
        "loja": "MERCADO DA AVENIDA",
        "saldo": "489"
    },
    {
        "loja": "LOJA DO Ó - MATRIZ",
        "saldo": "230"
    },
    {
        "loja": "MERCEARIA 3 IRMÃOS",
        "saldo": "-7023"
    },
    {
        "loja": "BAR DO JOÃO       ",
        "saldo": "-102"
    },
    {
        "loja": "LOJA DO Ó - FILIAL",
        "saldo": "152"
    }
]; */

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post(environment.apiUrl, formData);

      upload$.subscribe(result => {
        this.lojas = result;
      });
    }
  }
}
