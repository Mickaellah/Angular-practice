import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3001';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url);
    const data = await response.json();
    return data ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
