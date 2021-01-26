import { AuthService } from './../auth/auth.service';
import { WordService } from './../word.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { exhaust, exhaustMap, map, take, tap } from 'rxjs/operators';
import { Word } from './word.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(
    private http: HttpClient,
    private wordService: WordService,
    private authService: AuthService) {}

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
        'https://szosztar0-default-rtdb.firebaseio.com/words.json',
        // 'https://localhost:5001/api/Word'
        )
        .subscribe(
          (words) => {
            this.wordService.setWords(words);
        });
  }

  // to add token here rather than in interceptor
  // getWords() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this.http
  //       .get<Word[]>(
  //         // 'https://szosztar0-default-rtdb.firebaseio.com/words.json',
  //         'https://localhost:5001/api/Word',
  //         {
  //           params: new HttpParams().set('auth', user.token)
  //         }
  //         );
  //   }))
  //   .subscribe(
  //     (words) => {
  //       this.wordService.setWords(words);
  //   });
  // }

  postWord(word: Word) {
    this.http
      .post(
        'https://szosztar0-default-rtdb.firebaseio.com/words.json',
        // 'https://localhost:5001/api/Word',
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
