import { HttpService } from './../shared/http.service';
import { WordService } from './../word.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Word } from '../shared/word.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  // @ViewChild('wordInput', { static: false }) wordInputRef: ElementRef;
  // @ViewChild('f', { static: false }) formRef: NgForm;
  // formInputValue = '';

  constructor(
    public wordService: WordService,
    public httpService: HttpService
    ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const wordToAdd = new Word(5, form.value.word1, form.value.word2);
    this.httpService.storeWord(wordToAdd);
    form.reset();
  }
}
