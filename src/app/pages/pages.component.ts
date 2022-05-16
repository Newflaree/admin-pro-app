import { Component, OnInit } from '@angular/core';
// Services
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
  }
}
