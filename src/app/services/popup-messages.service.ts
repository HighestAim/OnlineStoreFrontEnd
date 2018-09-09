import { Injectable } from '@angular/core';
import { popupTitle } from '../constants/popup-title.constant';

@Injectable({
  providedIn: 'root'
})
export class PopupMessagesService {
  public message = '';
  public subMessage = '';
  public imageUrl: string;
  public title = popupTitle.INFO;

  constructor() { }

  show(title = popupTitle.INFO, message: string) {
    this.message = message;
    this.title = title;
    this.imageUrl = null;
  }


  showWithImage(title: string, imageUrl: string, innerText1: string, innerText2: string) {
    this.message = innerText1;
    this.subMessage = innerText2;
    this.imageUrl = imageUrl;
    this.title = title;
  }

  hide() {
    this.message = '';
  }
}
