import { Word } from './../shared/word.model';
import { WordService } from './../word.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public words: Word[] = [];
  public categories: string[] = [];
  public newCategory = false;
  columns = [
    'english',
    'hungarian'
  ];

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

  async onSubmit(form: NgForm) {
    await this.httpService.postCategory(form.value.newCat);
    this.newCategory = false;
    form.reset();
    this.httpService.getCategories();
  }

  onFilter(category: string) {
    if (category === 'all') {
      this.newCategory = false;
      this.words =this.wordService.getWords();
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
