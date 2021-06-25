import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import {identity, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}
  // serverTO: any;
  // sayHi(data: any) {
  //   const token = 'my JWT';
  //   const headers = new HttpHeaders().set('authorization', 'Bearer ' + token);
  //
  //   this.httpClient.get('http://192.168.1.84:8080/', {headers, responseType: 'blob' as 'json'}).subscribe(data => {
  //       (response: any) => {
  //         let dataType = response.type;
  //         let binaryData = [];
  //         binaryData.push(response);
  //         let downloadLink = document.createElement('a');
  //         downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  //         document.body.appendChild(downloadLink);
  //         downloadLink.click();
  //       };
  //     }
  //   )
  // }
  serverAdress = 'http://192.168.1.221:8080/';
  // serverAdress = 'http://192.168.1.84:8080/';

  sendPostRequest(data: any) {
    let config = { headers: {'Content-Type': undefined},
      transformRequest: identity
    }
    return this.httpClient.post(this.serverAdress, JSON.stringify(data), {headers: new HttpHeaders({ responseType: 'text'})})
    // this.httpClient.get(this.serverAdress).subscribe(data => {
    //    data;
    //   // console.log(this.serverData);
    // })

  }
  // downloadFile(route: string, filename: string = null): void{
  //
  //   const baseUrl = 'http://myserver/index.php/api';
  //   const token = 'my JWT';
  //   const headers = new HttpHeaders().set('authorization','Bearer '+token);
  //   this.http.get(baseUrl + route,{headers, responseType: 'blob' as 'json'}).subscribe(
  //     (response: any) =>{
  //       let dataType = response.type;
  //       let binaryData = [];
  //       binaryData.push(response);
  //       let downloadLink = document.createElement('a');
  //       downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  //       if (filename)
  //         downloadLink.setAttribute('download', filename);
  //       document.body.appendChild(downloadLink);
  //       downloadLink.click();
  //     }
  //   )
  // }


  saveData() {
    // console.log(this.dataForDocument.value)
    // this.serverTO = JSON.stringify(this.dataForDocument.value);
    // this.serverTO = this.dataForDocument.value;
    // // console.log(this.serverTO)
    // this.sayHi(this.serverTO);
    console.log(this.dataForDocument.value)

    this.sendPostRequest(this.dataForDocument.value).subscribe();
    // this.sayHi(this.dataForDocument.value)
  }
  dataForDocument = new FormGroup({
    urovenObraz: new FormControl(''),
    profil: new FormControl(''),
    disciplina: new FormControl(''),
    date: new FormControl(''),
    mestoVStructure: new FormControl('')
  });


  formControl = new FormControl();
  autoFilter: Observable<string[]> | undefined;

  ngOnInit(): void {
    this.autoFilter = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.mat_filter(value))
    );
  }

  private mat_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.data.Disciplina.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  downloadFile(){
    let link = window.document.createElement("a");
    link.download = "test.docx";
    link.href = "assets/test.docx";
    link.click();

    // let link = document.createElement('a');
    // link.setAttribute('type', 'hidden');
    // link.href = 'assets/';
    // link.download = "test.docx";
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  }

  title = 'Thesis';
  data = {
    UrovenObraz: ["Бакалавриат", "Магистатура"],
    Profil: ["Информационные технологии в дизайне", "Информационная поддержка жизненного цикла изделий и инфраструктуры"],
    Disciplina: ["История",
      "Русский язык и культура речи",
      "Физическая культура и спорт",
      "Иностранный язык",
      "Дискретная математика",
      "Информационные технологии",
      "Математика",
      "Графические информационные технологии",
      "Философия",
      "Физические основы информационно-телекоммуникационных систем",
      "Алгоритмы и структуры данных",
      "WEB-технологии",
      "Объектно-ориентированное программирование"
    ],
    MestoVStructure: [
      "Для дисциплин философия, история, иностранный язык, безопасность жизнедеятельности, физическая культура и спорт",
      "Для дисциплин относящихся к базовой части образовательной программы",
      "Для дисциплин вариативной части, определяющие направленность или специализацию ОП",
      "Для дисциплин вариативной части, углубляющих  формирование компетенций по направленности или специализации ОП",
      "Для факультативных дисциплин"
    ],
}

}

