import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  // Value se refiere al texto que vamos a truncar u operar
  // Si se supera el WordLimit el texto será truncado y le añadiremos ... al principio

  // Supongamos que tenemos palabra "Hola mundo" en value
  transform(value: string, wordLimit: number = 5): string  {
    if (!value) {
      return '';
    }

    else {
      const words = value.split(' '); // ["Hola", "mundo"]
      if (words.length > wordLimit) {
        const truncate = words.slice(0, wordLimit).join(" ") // el slice: [Hola, Mundo], el join: Hola Mundo
        //return "..." + truncate;
        return `... ${truncate}`;
      }
      else {
        return value;
      }
    }
  }

}
