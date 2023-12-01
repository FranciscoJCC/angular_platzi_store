import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({required: true }) message = '';

  counter = signal(0);
  counterRef : number | undefined;

  //Lo primero que se ejecuta antes de renderizar el componente
  //Solo corre una vez
  constructor(){
    //NO DEBE SER ASICRONO ( NO ASYNC )
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  //Antes y durante del renderizado del componente
  //Se mantiene escuchando
  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);

    //Verificamos si cambio el signal de duration
    const duration = changes['duration'];
    if(duration && duration.currentValue != duration.previousValue){
      this.doSomenthing();
    }
  }

  //Se after render
  //Solo se ejecuta una vez
  //async, then, subs
  //para obtener datos de terceros, (apis, bdd)
  ngOnInit(){
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration => ', this.duration);
    console.log('duration => ', this.message);

    this.counterRef = window.setInterval(() => {
      console.log(this.counter);
      this.counter.update(statePrev => statePrev + 1);
    }, 1000);
  }

  //after render
  //Si los hijos del componente ya fueron renderizados
  ngAfterViewInit(){
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  //Cuando se destruye el componente
  ngOnDestroy(){
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomenthing(){
    console.log('Consultando informacion por que cambio duration');
    //Correr logica sincronina o no. 
  }

}
