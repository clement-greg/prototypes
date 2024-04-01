import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
declare var MediaRecorder: any;

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent {
  mediaRecorder: typeof MediaRecorder;
  recording: boolean = false;

  recordings: any[] = [];
  constructor(private santizer: DomSanitizer,
    private http: HttpClient,
    private zone: NgZone) { }

  ngOnInit(): void { }

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
