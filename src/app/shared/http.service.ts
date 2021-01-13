import { WordService } from './../word.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Word } from './word.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient, private wordService: WordService) {}

  storeWord(word: Word) {
    this.http
      .post(
        'https://szosztar0-default-rtdb.firebaseio.com/words.json',
        word
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchWords() {
    return this.http
      .get<Word[]>(
        'https://szosztar0-default-rtdb.firebaseio.com/words.json')
        .pipe(map(responseData => {
          const newArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              newArray.push(responseData[key]);
            }
          }
          return newArray;
        }))
        .subscribe(
          (words) => {
            this.wordService.setWords(words);
        });
  }
}
