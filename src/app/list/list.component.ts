import { Word } from './../shared/word.model';
import { WordService } from './../word.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  words = [];
  columns = [
    'word1',
    'word2'
  ];

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.words = this.wordService.words;
    this.wordService.wordToAdd.subscribe(
      (wordinput) => {
        this.wordService.words.push(wordinput);
      });
  }
}
