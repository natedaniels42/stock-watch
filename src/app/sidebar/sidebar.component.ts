import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() stockList: {symbol: string, image: string}[] = []
  
  constructor() { }

  ngOnInit(): void {
  }

}
