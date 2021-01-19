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
            // console.log(categories);
        });
  }

  getWords() {
    return this.http
      .get<Word[]>(
        'https://localhost:5001/api/Word'
        // , { withCredentials: true }
        )
        // .pipe(map(responseData => {
        //   const newArray = [];
        //   for (const key in responseData) {
        //     if (true) {
        //       console.log(key);
        //       newArray.push(key);
        //     }
        //   }
        //   return newArray;
        // }))
        .subscribe(
          (words) => {
            this.wordService.setWords(words);
            // console.log(words);
        });
  }

  postWord(word: Word) {
    this.http
      .post(
        // 'https://szosztar0-default-rtdb.firebaseio.com/words.json',
        'https://localhost:5001/api/Word',
        word
      )
      .subscribe(response => {
        // console.log('post response:');
        // console.log(response);
      });
  }

  postCategory(category: string) {
    const postString = '"' + category + '"';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'text/json'})
    };

    this.http
      .post(
        // 'https://szosztar0-default-rtdb.firebaseio.com/words.json',
        'https://localhost:5001/api/Category',
        postString,
        httpOptions
      )
      .subscribe(response => {
        // console.log('post response:');
        // console.log(response);
      });
  }
}
