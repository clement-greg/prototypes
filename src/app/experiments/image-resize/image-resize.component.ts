import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { UtilitiesService } from '../../dependencies/utilities';

@Component({
    selector: 'app-image-resize',
    imports: [MatIconModule, MatButtonModule, MatCommonModule, CommonModule],
    templateUrl: './image-resize.component.html',
    styleUrl: './image-resize.component.scss'
})
export class ImageResizeComponent {
  fileElemId = UtilitiesService.newid();

  @Input() url: string;
  @Output() urlChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() width = 200;
  @Input() blockStyle: boolean;
  @Input() prompt = 'Change';
  @Input() iconClass: string;
  @Input() pasteTargetId: string;
  @Input() showClear: boolean;
  @Input() height = 0;


  imageType: string;
  dragTargetActive = false;

  handleFiles(files) {
    if (files.srcElement) {
      files = files.srcElement.files;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.imageType = file.type;
      const imageType = /^image\//;

      if (!imageType.test(file.type)) {
        continue;
      }
      const reader = new FileReader();

      const setUrl = (url) => {
        this.url = url;
        this.urlChange.emit(this.url);

        setTimeout(() => {
          const myImg: HTMLImageElement = document.createElement('img');
          myImg.src = url;

          var MAX_WIDTH = 300;
          var MAX_HEIGHT = 300;

          var width = myImg.width;
          var height = myImg.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = height * (MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = width * (MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }

          var canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(myImg, 0, 0, width, height);
          const shortenedUrl = canvas.toDataURL('image/jpeg');
          this.url = shortenedUrl;

          console.log({ height: myImg.height, width: myImg.width, shortenedUrl });
        }, 100);
      };
      reader.onload = (function () {
        return function (e) {

          (this as any).dragTargetActive = false;
          setUrl(e.target.result);

        };
      })();

      reader.readAsDataURL(file);
    }
  }

  ngAfterViewInit() {
    if (this.pasteTargetId) {
      this.setupPasteHandler();
    }
  }

  clear(event) {
    this.url = null;
    this.urlChange.emit(this.url);
    event.cancelBubble = true;
    event.preventDefault();
    event.stopPropagation();
  }

  getWidth() {
    if (this.width) {
      return this.width + 'px';
    } else {
      return 'unset';
    }
  }

  getHeight() {
    if (this.height) {
      return this.height + 'px';
    } else {
      return 'unset';
    }
  }

  private setupPasteHandler() {

    if (!document.getElementById(this.pasteTargetId)) {
      setTimeout(() => this.setupPasteHandler(), 100);
      return;
    }
    console.log('setting up paste handler');

    document.getElementById(this.pasteTargetId).onpaste = (event: any) => {
      console.log('data pasted')
      var items = (event.clipboardData || event.originalEvent.clipboardData).items;

      for (const index in items) {
        var item = items[index];
        if (item.kind === 'file') {
          var blob = item.getAsFile();
          var reader = new FileReader();
          const loadIt = (base64, fileName) => {
            // const attachment = new NoteAttachmentModel(fileName, null, base64);
            // this.attachments.push(attachment);
            // this.missionService.showToast('Image added as attachment');
            // if (!this.newNoteText) {
            //     this.newNoteText = 'Screenshot Attachment';
            // }
            this.url = base64;
            this.urlChange.emit(this.url);
          };
          reader.onload = function (event) {
            const base64 = event.target.result;
            let fileName = '';
            if (base64 && base64.toString().indexOf('image/png')) {
              fileName = 'screen-shot.png';
            }
            if (fileName) {
              loadIt(base64, fileName);
            }
          }; // data url!
          reader.readAsDataURL(blob);
        }
      }
    };
  }

  drop(e) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFiles(files);
    this.dragTargetActive = false;
  }

  dragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragTargetActive = true;
  }

  dragleave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragTargetActive = false;
  }
}
