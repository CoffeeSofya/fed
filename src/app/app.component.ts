import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  // sayHi(data: any) {
  //   this.httpClient.get('http://192.168.1.84:8080/').subscribe(data => {
  //     this.serverTO = data as JSON;
  //     console.log(this.serverData);
  //   })
  // }
  serverAdress = 'http://192.168.1.84:8080/';
  sendPostRequest(data: any) {
    return this.httpClient.post(this.serverAdress, JSON.stringify(data))
    // this.httpClient.get(this.serverAdress).subscribe(data => {
    //    data;
    //   // console.log(this.serverData);
    // })
  }
  saveData() {
    // console.log(this.dataForDocument.value)
    // this.serverTO = JSON.stringify(this.dataForDocument.value);
    // this.serverTO = this.dataForDocument.value;
    // // console.log(this.serverTO)
    // this.sayHi(this.serverTO);
    console.log(this.dataForDocument.value)
    this.sendPostRequest(this.dataForDocument.value).subscribe();
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
      "Для факультативных дисциплин",
    ],
}

}

