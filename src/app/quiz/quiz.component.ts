import { Word } from './../shared/word.model';
import { WordService } from './../word.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public words: Word[] = [];
  public categories: string[] = [];
  public newCategory = false;
  columns = [
    'english',
    'hungarian'
  ];
  public selected = false;
  public selection = '';
  public englishQuizWord = '';
  public hungarianQuizWord = '';
  public displayQuizWord = '';
  public answer = '';

  constructor(
    private wordService: WordService,
    private httpService: HttpService
    ) { }

  ngOnInit() {
    this.httpService.getWords();
    this.wordService.wordsChanged.subscribe(
      (wordsData) => {
        this.words = wordsData;
    });

    this.httpService.getCategories();
    this.wordService.categoriesChanged.subscribe(
      (categoriesData) => {
        this.categories = ['all', ...categoriesData, 'new'];
    });
  }

  onQuizSelect(selection: string) {
    this.selection = selection;
    const quizWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.englishQuizWord = quizWord.english;
    this.hungarianQuizWord = quizWord.hungarian;

    if (selection === 'english') {
      this.displayQuizWord = quizWord.hungarian;
      this.answer = quizWord.english;
    }
    else {
      this.displayQuizWord = quizWord.english;
      this.answer = quizWord.hungarian;
    }

    console.log(this.englishQuizWord, this.hungarianQuizWord, this.displayQuizWord, this.answer);

    // console.log(val);
    // console.log(form.value.quizType);
    // this.httpService.postCategory(form.value.quizType);
    // form.reset();
  }

  onSubmit(form: NgForm) {
    if (form.value.quizGuess === this.answer) {
      alert('Correct, ' + this.hungarianQuizWord + ' means ' + this.englishQuizWord + '!');
    }
    else {
      alert('Sorry, the answer is ' + this.answer + '.');
    }
    form.reset();
  }

  onGiveUp() {
    // this button just submits nothing and triggers the incorrect alert
    // adding type="button" would prevent this behavior
  }

  onFilter(category: string) {
    if (category === 'all') {
      this.newCategory = false;
      this.words = this.wordService.getWords();
    }
    else if (category === 'new') {
      this.newCategory = true;
    }
    else {
      this.newCategory = false;
      this.words = this.wordService.getWords().filter(
        word => word.category === category
      );
    }
  }

}
