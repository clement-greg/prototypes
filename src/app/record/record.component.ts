import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var MediaRecorder: any;

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, HttpClientModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent {
  mediaRecorder: typeof MediaRecorder;
  recording: boolean = false;
  voices: SpeechSynthesisVoice[];
  seletedVoice: SpeechSynthesisVoice;

  recordings: any[] = [];
  constructor(private santizer: DomSanitizer,
    private http: HttpClient,
    private zone: NgZone) { }

  ngOnInit(): void {

    const synth = window.speechSynthesis;
    this.voices = synth.getVoices().filter(i=>i.lang === 'en-US' || i.lang === 'en-GB');

    this.seletedVoice = this.voices.find(i => i.default);
    console.log(this.voices);
  }

  stop(evt: MouseEvent | TouchEvent) {
    if ((evt as any).button === 0 || evt.type === 'touchend') {
      if (this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
        this.recording = false;
      }
    }
  }

  removeRecording(recording) {
    this.recordings.splice(this.recordings.indexOf(recording), 1);
  }

  testSyth() {
    const synt = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance('Hello, how are you doing?  I hope your day is going aweful!!!!');
    utter.voice = this.seletedVoice;
    synt.speak(utter);
  }

  doRecord(evt: MouseEvent | TouchEvent) {
    if ((evt as any).button === 0 || evt.type === 'touchstart') {
      evt.preventDefault();
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.recording = true;
          let chunks = [];
          this.mediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
          };

          this.mediaRecorder.onstop = async e => {

            const arrayBuffer = await new Response(chunks[0]).arrayBuffer();
            const blob = new Blob([new Uint8Array(arrayBuffer)]);
            const audioURL = window.URL.createObjectURL(blob);
            this.zone.run(() => {
              this.recordings.push(this.santizer.bypassSecurityTrustUrl(audioURL));
            });
            chunks = [];
          }
        }).catch(err => {
          console.error(err);
        });
      }
    }
  }

  base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
