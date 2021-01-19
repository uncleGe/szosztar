import { Injectable, OnDestroy } from '@angular/core';
import { Word } from './shared/word.model';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class WordService {
  public words: Word[] = [];
  public categories: string[] = [];
  // words = [
  //   new Word(0, 'word0e', 'word0h'),
  //   new Word(1, 'word1e', 'word1h'),
  //   new Word(2, 'word2e', 'word2h'),
  // ];

  // wordToAdd = new EventEmitter<string>();
  // wordToAdd = new Subject<Word>();
  // categoryToAdd = new Subject<Word>();

  wordsChanged = new Subject<Word[]>();
  categoriesChanged = new Subject<string[]>();

  // wordSubscription: Subscription;


  getWords() {
    return this.words.slice();
  }

  setWords(words: Word[]) {
    this.words = words;
    this.wordsChanged.next(this.words);
  }

  getCategories() {
    return this.categories.slice();
  }

  setCategories(categories: string[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories);
  }

  // ngOnDestroy(): void {
  //   this.wordSubscription.unsubscribe();
  // }
}
