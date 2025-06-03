import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from './services/websocket.service';  // adjust path if needed
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  newMessage = '';
  private messageSub?: Subscription;

  constructor(private websocketService: WebsocketService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.messageSub = this.websocketService.onMessage().subscribe(msg => {
      this.ngZone.run(() => {
        console.log('Received:', msg);
        this.messages.push(msg);
      });
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.websocketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.messageSub?.unsubscribe();
    this.websocketService.disconnect();
  }
}
