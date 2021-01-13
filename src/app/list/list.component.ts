import { Word } from './../shared/word.model';
import { WordService } from './../word.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public words: Word[] = [];
  columns = [
    'word1',
    'word2'
  ];

  constructor(
    private wordService: WordService,
    private httpService: HttpService
    ) { }

  ngOnInit() {
    this.httpService.fetchWords();
    this.wordService.wordsChanged.subscribe(
      (wordsData) => {
        this.words = wordsData;
    });
  }

}
