import { Component, OnInit } from '@angular/core';
import { ChatGptService } from '../../services/chat-gpt.service';

@Component({
  selector: 'app-chat-gpt',
  standalone: false,
  templateUrl: './chat-gpt.component.html',
  styleUrl: './chat-gpt.component.scss'
})
export class ChatGptComponent implements OnInit {

  question: string = '';
  messages: { type: 'user' | 'gpt', content: string }[] = [];
  loading = false;
  searchTerm: string = '';
  fromDate: string = '';
  toDate: string = '';


  constructor(private chatGptService: ChatGptService) {}

  ngOnInit(): void {
    this.loadHistoryFromBackend();
  }

  loadHistoryFromBackend(): void {
    this.chatGptService.getHistory().subscribe({
      next: (history) => {
        this.messages = history.flatMap((msg: any) => [
          { type: 'user', content: msg.question },
          { type: 'gpt', content: msg.answer }
        ]);
      },
      error: (error) => {
        console.error('Error al cargar historial:', error);
      }
    });
  }

  sendQuestion(): void {
    if (!this.question.trim()) return;

    const userMessage = this.question.trim();
    this.messages.push({ type: 'user', content: userMessage });
    this.loading = true;

    this.chatGptService.askQuestion(userMessage).subscribe({
      next: (response) => {
        this.messages.push({ type: 'gpt', content: response.answer });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ type: 'gpt', content: 'Ocurrió un error al contactar con el servidor.' });
        this.loading = false;
      }
    });

    this.question = '';
  }

  clearHistory(): void {
    this.chatGptService.deleteHistory().subscribe({
      next: () => {
        this.messages = [];
      },
      error: (error) => {
        console.error('Error al borrar historial:', error);
      }
    });
  }


}
