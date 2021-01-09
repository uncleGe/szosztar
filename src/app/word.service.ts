import { Word } from './shared/word.model';
import { EventEmitter } from '@angular/core';

export class WordService {
  // words = [
  //   'one',
  //   'two',
  //   'three'
  // ];

  words = [
    new Word(0, 'word0e', 'word0h'),
    new Word(1, 'word1e', 'word1h'),
    new Word(2, 'word2e', 'word2h'),
  ];

  wordToAdd = new EventEmitter<string>();

}
