import { WordService } from './../word.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Word } from './word.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient, private wordService: WordService) {}

  getCategories() {
    return this.http
      .get<string[]>(
        'https://localhost:5001/api/Category'
        )
        .subscribe(
          (categories) => {
            this.wordService.setCategories(categories);
        });
  }

  getWords() {
    return this.http
      .get<Word[]>(
        'https://localhost:5001/api/Word'
        )
        .subscribe(
          (words) => {
            this.wordService.setWords(words);
        });
  }

  postWord(word: Word) {
    this.http
      .post(
        'https://localhost:5001/api/Word',
        word
      )
      .subscribe(
        () =>
          alert('New Word Submitted')
      );
  }

  postCategory(category: string) {
    const postString = '"' + category + '"';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'text/json'})
    };

    this.http
      .post(
        'https://localhost:5001/api/Category',
        postString,
        httpOptions
      )
      .subscribe(
        () => {
          alert('New Category Submited');
          this.getCategories();
      });
  }
}
