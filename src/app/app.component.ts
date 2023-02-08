import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { AppDataControls } from './enum/app-data.controls';
import { Test } from './interfaces/test.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tests: Test[] = [];
  urlImg: string = AppDataControls.IMAGEN;
  ELEMENTS: number = AppDataControls.ELEMENTS;
  randomLength: number = AppDataControls.RANDOMLENGTH;
  inputValue: string = '';
  constantField: Test[] = []
  debouncer: Subject<string> = new Subject();

  constructor() {
    this.debouncer.pipe(debounceTime(300)).subscribe((nameToFilter: string) => {
      this.dataField(nameToFilter);
    });
  }
  ngOnInit(): void {
    this.fillTests();
  }
  /*Generamos un bucle de 4000 iteraciones en el que realizamos la inserción 
  de los datos en el array correspondiente*/
  fillTests() {
    for (let i = 0; i < this.ELEMENTS; i++) {

      this.tests.push({
        id: i.toString(),
        photo: this.urlImg,
        text: this.randomText(this.randomLength)
      });
    }
    this.constantField = this.tests;
  }

  /* Realizamos un bucle para la inserción de caracteres al azar*/
  randomText(textLength: number): string {
    const options = AppDataControls.APLHABET;
    let result = '';
    for (let i = 0; i < textLength; i++) {
      result += options.charAt(Math.floor(Math.random() * options.length));
    }
    return result;
  }

  /* Cada vez que generamos el evento de escritura en el input, lo enviamos al debouncer para efectuar la búsqueda */
  searchField($event: any) {
    this.inputValue = $event.target.value.toLowerCase();
    this.debouncer.next(this.inputValue);
  }

  /*Comprobamos el valor del input y en función del valor escrito, vemos si coincide con el id o texto escrito*/
  dataField(nameToFilter: string) {
    if (this.inputValue === '') {
      this.tests = this.constantField
    } else {
      const datafiltered = this.constantField.filter((value: Test) => {
        return (value.text.includes(nameToFilter) || value.id.includes(nameToFilter));
      });
      this.tests = datafiltered;
    }
  }


}
