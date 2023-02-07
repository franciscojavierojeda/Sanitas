import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Test } from './interfaces/test.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test_app';
  tests: Test[] = [];
  urlImg: string = 'https://picsum.photos/id/1/500/500';
  ELEMENTS: number = 4000;
  randomLength: number = 20;
  inputValue: string = '';
  constantField: Test[] = []
  debouncer: Subject<string> = new Subject();

  constructor() {
    this.debouncer.pipe(debounceTime(500)).subscribe((nameToFilter: string) => {
      this.dataField(nameToFilter);
    });
  }
  ngOnInit(): void {
    this.fillTests();
  }
  fillTests() {
    /* Para ahorrarnos la creación de un bucle generamos un map con un Array por defecto
       y le asignamos como id el indice, y al texto una función de generación de textos aleatorios*/
    this.tests = Array(this.ELEMENTS).map((element, i) => ({
      id: i.toString(),
      photo: this.urlImg,
      text: this.randomText(this.randomLength)
    }));
    this.constantField = this.tests;
  }
  randomText(textLength: number): string {
    const options = 'abcdefghijklmnñopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < textLength; i++) { // Al ser poco elementos, realizamos un bucle para la inserción de caracteres al azar
      result += options.charAt(Math.floor(Math.random() * options.length));
    }

    return result;
  }

  searchField($event: any) { // Cada vez que generamos el evento de escritura en el input, lo enviamos al debouncer para efectuar la búsqueda 
    this.inputValue = $event.target.value.toLowerCase();
    this.debouncer.next(this.inputValue);
  }

  dataField(nameToFilter: string) {
    //Comprobamos el valor del input y en función del valor escrito, vemos si coincide con el id o texto escrito
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
