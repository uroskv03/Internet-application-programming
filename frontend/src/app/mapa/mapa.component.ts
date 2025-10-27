import {AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet'; 


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'mapa/marker-icon-2x.png',
  iconUrl: 'mapa/marker-icon.png',
  shadowUrl: 'mapa/marker-shadow.png'
});

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {

  @Input() lat: number = 0;
  @Input() lng: number = 0;

  private map: L.Map | undefined

  ngAfterViewInit(): void {
      this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 15
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Dodaj marker
    const marker = L.marker([this.lat, this.lng]).addTo(this.map);
    //marker.bindPopup('Vikendica').openPopup();
  }
}
