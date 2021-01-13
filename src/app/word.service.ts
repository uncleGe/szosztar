import { Injectable, OnDestroy } from '@angular/core';
import { Word } from './shared/word.model';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class WordService implements OnDestroy {
  public words: Word[] = [];
  // words = [
  //   new Word(0, 'word0e', 'word0h'),
  //   new Word(1, 'word1e', 'word1h'),
  //   new Word(2, 'word2e', 'word2h'),
  // ];

  // wordToAdd = new EventEmitter<string>();
  wordToAdd = new Subject<Word>();
  wordSubscription: Subscription;

  wordsChanged = new Subject<Word[]>();


  setWords(words: Word[]) {
    this.words = words;
    this.wordsChanged.next(this.words);
  }

  getWords() {
    return this.words.slice();
  }

  ngOnDestroy(): void {
    this.wordSubscription.unsubscribe();
  }
}
