import { Component, OnInit } from '@angular/core';
// Services
import { SettingsService, SidebarService } from '../services';

declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunction();
    this.sidebarService.loadMenu();
  }
}
