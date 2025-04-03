import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [FooterComponent,NgIf,NgFor],
  standalone:true,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  modalVisible: boolean = false;
  mostrandoRespuestas = false;
  comentarioSeleccionado: any = null;

  comentarios = [
    {
      id: 1,
      autor: 'AnaLópez',
      mensaje: 'Totalmente de acuerdo, caminar me ayuda muchísimo.',
      likes: 12,
      respuestas: 3
    },
    {
      id: 2,
      autor: 'JoseMartinez',
      mensaje: 'Te recomiendo probar meditación guiada, hay muchas apps buenas.',
      likes: 8,
      respuestas: 1
    },
    {
      id: 3,
      autor: 'SaraRuiz',
      mensaje: 'Gracias por compartir estos consejos, justo los necesitaba hoy 🙏',
      likes: 19,
      respuestas: 5
    }
  ];

  respuestasEjemplo = [
    { autor: 'ElenaG', mensaje: 'AnaLópez, Me ha funcionado también, ¡ánimo!' },
    { autor: 'MarioP', mensaje: 'AnaLópez, Yo salgo a correr y me cambia el día.' },
    { autor: 'ClaraF', mensaje: 'AnaLópez, Gracias por compartir, lo probaré 💚' },
    { autor: 'LuisR', mensaje: 'AnaLópez, Importante cuidarse, buena reflexión.' }
  ];

  abrirModal(): void {
    this.modalVisible = true;
    this.mostrandoRespuestas = false;
    this.comentarioSeleccionado = null;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  verRespuestas(comentario: any): void {
    this.mostrandoRespuestas = true;
    this.comentarioSeleccionado = comentario;
  }

  volverAComentarios(): void {
    this.mostrandoRespuestas = false;
    this.comentarioSeleccionado = null;
  }
}

