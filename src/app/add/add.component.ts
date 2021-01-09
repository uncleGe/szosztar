import { WordService } from './../word.service';
import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  // @ViewChild('wordInput', { static: false }) wordInputRef: ElementRef;
  // @ViewChild('f', { static: false }) formRef: NgForm;
  // formInputValue = '';

  constructor(public wordService: WordService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.wordService.wordToAdd.emit(form.value);
    form.reset();
  }

  // using ViewChild instead of form submit input
  // onSubmit() {
  //   console.log(this.formRef.value.word);
  //   this.formInputValue = this.formRef.value;
  // }

  // onAddItem() {
  //   const wordInput = this.wordInputRef.nativeElement.value;
  //   this.wordService.wordToAdd.emit(wordInput);
  // }

}
