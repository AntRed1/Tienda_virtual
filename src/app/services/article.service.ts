// article.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}

  private articulos = [
    {
      id: 1,
      name: 'Silla de Masajes',
      category: 'Hogar',
      price: 100,
      description: 'Silla de masaje de lujo, pantalla de control inteligente AI, silla portátil multifuncional de masaje con airbag de cuerpo completo.',
      images: [
        'img/img_massage_chair/image.png',
        'img/img_massage_chair/Screenshot 2024-06-02 073355.png',
        'img/img_massage_chair/Screenshot 2024-06-02 073555.png'
      ],
      quantities: [1, 2, 3, 4, 5]
    },
    {
      id: 2,
      name: 'Ventiladores',
      category: 'Electronica',
      price: 10,
      description: 'Ventiladores portátiles USB con nivel de polvo de ventilador.',
      images: [
        'img/img_fan/Screenshot 2024-06-02 073858.png',
        'img/img_fan/Screenshot 2024-06-02 074010.png'
      ],
      quantities: [1, 2, 3, 4, 5]
    },
    {
      id: 3,
      name: 'Cepillo de limpieza',
      category: 'Hogar',
      price: 25,
      description: 'Cepillo de limpieza eléctrico inteligente, cepillo giratorio, cepillo de limpieza eléctrico.',
      images: [
        'img/img_cepillo/Screenshot 2024-06-02 074209.png',
        'img/img_cepillo/Screenshot 2024-06-02 074247.png'
      ],
      quantities: [1, 2, 3, 4, 5]
    },
    {
      id: 4,
      name: 'Trapeador de limpieza',
      category: 'Hogar',
      price: 30,
      description: 'Trapeador de limpieza, cabezal de trapeador plano de microfibra reutilizable y trapeador de microfibra de acero inoxidable.',
      images: [
        'img/img_fregona/Screenshot 2024-06-02 074542.png',
        'img/img_fregona/Screenshot 2024-06-02 074829.png'
      ],
      quantities: [1, 2, 3, 4, 5]
    },
    {
      id: 5,
      name: 'Cargador portátil',
      category: 'Electronica',
      price: 15,
      description: 'Cargador portátil del banco 10000mah del poder del viaje de la electrónica de consumo del nuevo regalo promocional de los productos calientes de la venta.',
      images: [
        'img/img_power bank/1.png',
        'img/img_power bank/2.png'
      ],
      quantities: [1, 2, 3, 4, 5]
    }
  ];

  getArticles() {
    return this.articulos;
  }
}
