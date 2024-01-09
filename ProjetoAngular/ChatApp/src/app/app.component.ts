import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private hubConnection: signalR.HubConnection;
  messages: string[] = [];
  user: string = '';
  message: string = '';

  ngOnInit(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7220/chatHub') // Update with your backend URL
      .build();

    this.hubConnection.start().catch(err => console.error(err));

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messages.push(`${user}: ${message}`);
    });
  }

  sendMessage(): void {
    this.hubConnection.invoke('SendMessage', this.user, this.message)
      .catch(err => console.error(err));
    this.message = '';
  }
}
