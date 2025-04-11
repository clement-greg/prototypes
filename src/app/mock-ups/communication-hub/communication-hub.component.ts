import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { UtilitiesService } from '../../dependencies/utilities';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';

enum CommunicationType {
  Voice,
  Text,
  Email,
  WebChat,
  VoiceChat,
  Mention,
  SystemNotification
}

class Communication {
  from: string;
  text: string;
  isNew: boolean;
  createdDate: Date;
  threadCount: number;
  communicationType: CommunicationType;
  fromId: string;
  voiceUrl: string;
  cssClass: string;
  messages?: Message[];
}

class Message {
  senderId: string;
  direction: 'in' | 'out';
  subject: string;
  text: string;
  createdDate: Date;
}

@Component({
  selector: 'app-communication-hub',
  templateUrl: './communication-hub.component.html',
  styleUrls: ['./communication-hub.component.css'],
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, MatTabsModule, MatFormFieldModule, FormsModule, MatInputModule, TextFieldModule]
})
export class CommunicationHubComponent implements OnInit {

  communicationOpen = false;
  communications: Communication[];
  selectedCommunication: Communication;
  selectedIndex = 0;
  panelId = UtilitiesService.newid();
  textBoxId = UtilitiesService.newid();
  newMessage = '';
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor() { }

  ngOnInit(): void {
    this.communications = [];
    this.communications.push({
      from: 'Greg Clement',
      text: 'This is a mention',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.Mention,
      fromId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: 'Scott Smith',
      text: '@Greg Clement, please look at the UX on the orders report. Something looks a little off.  Check the ACC verses the total claims created.  It looks like the ACC is not calculating correctly.  Thanks!',
      isNew: false,
      createdDate: new Date(),
      threadCount: 2,
      communicationType: CommunicationType.Email,
      fromId: '9c196c31-2c44-4000-af5a-096032940aa9',
      voiceUrl: null,
      cssClass: null,
      messages: [
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Orders Report UX',
          text: 'Please take a look at the orders report UX. Something looks off.',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'Sure, I\'ll look.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Orders Report UX',
          text: 'Please take a look at the orders report UX. Something looks off.',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Orders Report UX',
          text: 'Please take a look at the orders report UX. Something looks off.',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Orders Report UX',
          text: 'Please take a look at the orders report UX. Something looks off.',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Orders Report UX',
          text: 'Please take a look at the orders report UX. Something looks off.',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Orders Report UX',
          text: 'Please take a look at the orders report UX. Something looks off.',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Orders Report UX',
          text: 'Please take a look at the orders report UX. Something looks off.',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
        {
          senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
          direction: 'in',
          subject: 'Re: Orders Report UX',
          text: 'I will take a look at it and get back to you.',
          createdDate: new Date()
        },
        {
          senderId: '9c196c31-2c44-4000-af5a-096032940aa9',
          direction: 'out',
          subject: 'Re: Orders Report UX',
          text: 'Thanks!',
          createdDate: new Date()
        },
      ]
    });
    this.communications.push({
      from: 'Scott Smith',
      text: 'Can we look at the possibility of making the orders report mobile friendly?',
      isNew: true,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.Email,
      fromId: '9c196c31-2c44-4000-af5a-096032940aa9',
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: 'Scott Smith',
      text: 'Is the SMS Texting working yet?',
      isNew: true,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.Text,
      fromId: '9c196c31-2c44-4000-af5a-096032940aa9',
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: 'Scott Hellewell',
      text: 'Voice Chat',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.VoiceChat,
      fromId: '1a69a01e-80e1-4de0-882b-654c005079b7',
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    this.communications.push({
      from: null,
      text: 'A new task has been assigned to you',
      isNew: false,
      createdDate: new Date(),
      threadCount: 1,
      communicationType: CommunicationType.SystemNotification,
      fromId: null,
      voiceUrl: null,
      cssClass: null,
    });
    for (const communication of this.communications) {
      this.setCssClass(communication);
    }
  }

  selectCommunication(communication: Communication) {
    this.selectedCommunication = communication;
    this.selectedIndex = 1;
    // scroll a div to the bottom
    this.scrollPanelToBottom();
    communication.isNew = false;
    // Make rest call to mark as unread
    //this.focusTextBox();
    setTimeout(() => this.focusTextBox(), 500);

  }

  goBack() {
    this.selectedIndex = 0;
    delete this.selectedCommunication;
  }

  focusTextBox() {

    if (!this.canReply) {
      return;
    }
    if (!document.getElementById(this.textBoxId)) {
      setTimeout(() => {
        this.focusTextBox();
      }, 100);
      return;
    }
    document.getElementById(this.textBoxId).focus();
  }

  scrollPanelToBottom() {
    if (!document.getElementById(this.panelId)) {
      setTimeout(() => {
        this.scrollPanelToBottom();
      }, 100);
      return;
    }

    document.getElementById(this.panelId).scrollTo(0, document.getElementById(this.panelId).scrollHeight);
  }

  private setCssClass(communication: Communication) {
    switch (communication.communicationType) {
      case CommunicationType.Email:
        communication.cssClass = 'email';
        break;
      case CommunicationType.Mention:
        communication.cssClass = 'record_voice_over';
        break;
      case CommunicationType.Text:
        communication.cssClass = 'sms';
        break;
      case CommunicationType.Voice:
        communication.cssClass = 'phone';
        break;
      case CommunicationType.VoiceChat:
        communication.cssClass = 'voicemail';
        break;
      case CommunicationType.WebChat:
        communication.cssClass = 'chat_bubble_outline';
        break;
      case CommunicationType.SystemNotification:
        communication.cssClass = 'notifications_none';
        break;
    }
  }

  get unreadCount() {
    return this.communications?.filter(c => c.isNew).length ?? 0;
  }

  sendMessage() {
    if (!this.newMessage) {
      return;
    }
    if (!this.selectedCommunication.messages) {
      this.selectedCommunication.messages = [];
    }
    this.selectedCommunication.messages.push({
      senderId: '8e5c8b2f-845e-456f-a3d9-1ba9e4e75635',
      direction: 'out',
      subject: '',
      text: this.newMessage,
      createdDate: new Date()
    });
    this.newMessage = '';
    setTimeout(() => {
      this.scrollPanelToBottom();
    }, 100);
  }



  get canReply() {
    return this.selectedCommunication.communicationType !== CommunicationType.SystemNotification;
  }


}
