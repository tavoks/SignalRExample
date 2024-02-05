import { Component, OnInit } from '@angular/core';
import { SignalRService } from './signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private signalRService: SignalRService) { }
  title = 'Meu Aplicativo Angular';
  public users: Set<string> = new Set();
  messages: Array<{ user: string, message: string, connectionId: string }> = [];
  user: string = '';
  message: string = '';
  userId: string = '';

  ngOnInit(): void {
    this.signalRService.startConnection();

    this.signalRService.hubConnection.on('ReceiveMessage', (user: string, message: string, connectionId: string) => {
      this.messages.push({ user, message, connectionId });
    });
  }

  sendMessage(): void {
    this.signalRService.hubConnection.invoke('SendMessage', this.user, this.message)
      .catch(err => console.error(err));
    this.message = '';
  }

  isUserOnline(connectionId: string): boolean {
    return this.signalRService.users.has(connectionId);
  }
}

