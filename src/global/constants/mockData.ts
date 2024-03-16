import { ICar } from '../interfaces';

export const mockData: ICar[] = [
  {
    id: 'ABCD-1234-ABCD-5555',
    brand: 'BMW',
    model: 'i5',
    year: 2024,
    hourPrice: 750.0,
    color: {
      text: 'grey',
      hex: '#404040',
    },
    image:
      'https://sedanaraba.com/wp-content/uploads/2023/06/yeni-bmw-i5-teknik-ozellikleri-cover-1024x576.jpg',
    transmission: 'Automatic',
    fuelType: 'Electric',
    seat: 4,
    avaliable: true,
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: 'ZXCV-5678-ZXCV-7777',
    brand: 'Audi',
    model: 'A3',
    year: 2020,
    hourPrice: 1250.0,
    color: {
      text: 'black',
      hex: '#262626',
    },
    image: 'https://arabam-blog.mncdn.com/wp-content/uploads/2020/12/New-Audi-A3-2020-UK-7.jpg',
    transmission: 'Manual',
    fuelType: 'Petrol',
    seat: 4,
    avaliable: false,
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: 'AXDF-9975-XXSS-6666',
    brand: 'Ferrari',
    model: 'Spider',
    year: 2017,
    hourPrice: 2500.0,
    color: {
      text: 'white',
      hex: '#e5e5e5',
    },
    image: 'https://i.i-sgcm.com/news/article_reviews/2012/503_1_l.jpg',
    transmission: 'Hybrid',
    fuelType: 'Electric',
    seat: 2,
    avaliable: true,
    createdDate: new Date(),
    updatedDate: new Date(),
  },
];
