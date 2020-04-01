import { Injectable } from "@angular/core";
export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--primary": "#5265ff",
    "--primary-background": "#e1e0ff",
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--primary": "#759699",
    "--primary-background": "#2f2b38",
  }
};

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private active: Theme = light;

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
