import { Injectable } from '@angular/core';
import { describe } from 'node:test';

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
      describe:
        'Silla de masaje de lujo, pantalla de control inteligente AI, silla portátil multifuncional de masaje con airbag de cuerpo completo.',
    },
    {
      id: 2,
      name: 'Ventiladores',
      category: 'Electronica',
      price: 10,
      describe: 'Ventiladores portátiles USB con nivel de polvo de ventilador.',
    },
    ,
    {
      id: 3,
      name: 'Cepillo de limpieza',
      category: 'Hogar',
      price: 25,
      describe:
        'Cepillo de limpieza eléctrico inteligente, cepillo giratorio, cepillo de limpieza eléctrico.',
    },
    ,
    {
      id: 4,
      name: 'Trapeador de limpieza',
      category: 'Hogar',
      price: 30,
      describe:
        'Trapeador de limpieza, cabezal de trapeador plano de microfibra reutilizable y trapeador de microfibra de acero inoxidable.',
    },
    ,
    {
      id: 5,
      name: 'Cargador portátil',
      category: 'Electronica',
      price: 15,
      describe:
        'Cargador portátil del banco 10000mah del poder del viaje de la electrónica de consumo del nuevo regalo promocional de los productos calientes de la venta.',
    },
  ];

  getArticles() {
    return this.articulos;
  }
}
