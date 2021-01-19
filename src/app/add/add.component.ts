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
  // categories = [
  //   'food',
  //   'animals',
  //   'greetings'
  // ];
  public categories: string[] = [];

  constructor(
    public wordService: WordService,
    public httpService: HttpService
    ) { }

  ngOnInit() {
    this.httpService.getCategories();
    this.wordService.categoriesChanged.subscribe(
      (categoriesData) => {
        this.categories = categoriesData;
    });
  }

  onSubmit(form: NgForm) {
    const wordToAdd = new Word(
      0,
      form.value.english,
      form.value.hungarian,
      form.value.category
      );
    this.httpService.postWord(wordToAdd);
    // console.log('add:');
    // console.log(form.value.english, form.value.hungarian, form.value.category);
    // console.log(wordToAdd);
    form.reset();
  }
}
