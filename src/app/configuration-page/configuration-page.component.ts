import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';


export interface Option {
  name: string;
}

const ELEMENT_DATA: Option[] = [
  { name: 'Correspondence' },
  {name: 'Billing'},
  { name: 'Calendar' },
  {name: 'Others'}
];

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.css']
})
export class ConfigurationPageComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource = [...ELEMENT_DATA];
  @ViewChild(MatTable)
    table!: MatTable<Option>;
  constructor() { }

  ngOnInit(): void {
  }

}
