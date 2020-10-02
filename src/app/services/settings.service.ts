import { Injectable } from '@angular/core';

import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  };

  constructor() {
    if (localStorage.getItem('client-panel-settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('client-panel-settings'));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  updateSettings(newSettings: Settings): void {
    localStorage.setItem('client-panel-settings', JSON.stringify(newSettings));
  }
}
