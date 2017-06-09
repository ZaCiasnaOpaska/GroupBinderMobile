import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mainTab = HomePage;
  settingsTab = AboutPage;

  constructor() {

  }
}
