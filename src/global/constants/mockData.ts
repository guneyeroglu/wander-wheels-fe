import moment from 'moment';

import { ICar } from '../interfaces';

export const mockData: ICar[] = [
  {
    id: 'ABCD-1234-ABCD-5555',
    brand: 'BMW',
    model: 'i5',
    year: 2024,
    dayPrice: 750.0,
    color: {
      text: 'Grey',
      code: '#404040',
    },
    images: {
      featured:
        'https://sedanaraba.com/wp-content/uploads/2023/06/yeni-bmw-i5-teknik-ozellikleri-cover-1024x576.jpg',
      others: [
        'https://arabam-blog.mncdn.com/wp-content/uploads/2020/12/New-Audi-A3-2020-UK-7.jpg',
        'https://i.i-sgcm.com/news/article_reviews/2012/503_1_l.jpg',
        'https://sedanaraba.com/wp-content/uploads/2023/06/yeni-bmw-i5-teknik-ozellikleri-cover-1024x576.jpg',
        'https://arabam-blog.mncdn.com/wp-content/uploads/2020/12/New-Audi-A3-2020-UK-7.jpg',
      ],
    },
    transmission: {
      id: 1,
      type: 'Automatic',
    },
    fuel: {
      id: 1,
      type: 'Electric',
    },
    seat: 4,
    createdDate: moment().toDate(),
    updatedDate: moment().toDate(),
  },
  {
    id: 'ZXCV-5678-ZXCV-7777',
    brand: 'Audi',
    model: 'A3',
    year: 2020,
    dayPrice: 1250.0,
    color: {
      text: 'Black',
      code: '#262626',
    },
    images: {
      featured:
        'https://arabam-blog.mncdn.com/wp-content/uploads/2020/12/New-Audi-A3-2020-UK-7.jpg',
      others: [
        'https://i.i-sgcm.com/news/article_reviews/2012/503_1_l.jpg',
        'https://sedanaraba.com/wp-content/uploads/2023/06/yeni-bmw-i5-teknik-ozellikleri-cover-1024x576.jpg',
        'https://arabam-blog.mncdn.com/wp-content/uploads/2020/12/New-Audi-A3-2020-UK-7.jpg',
        'https://i.i-sgcm.com/news/article_reviews/2012/503_1_l.jpg',
      ],
    },
    transmission: {
      id: 2,
      type: 'Manual',
    },
    fuel: {
      id: 2,
      type: 'Petrol',
    },
    seat: 4,
    createdDate: moment().add(-15, 'day').toDate(),
    updatedDate: moment().toDate(),
  },
  {
    id: 'AXDF-9975-XXSS-6666',
    brand: 'Ferrari',
    model: 'Spider',
    year: 2017,
    dayPrice: 2500.0,
    color: {
      text: 'White',
      code: '#e5e5e5',
    },
    images: {
      featured: 'https://i.i-sgcm.com/news/article_reviews/2012/503_1_l.jpg',
      others: [
        'https://sedanaraba.com/wp-content/uploads/2023/06/yeni-bmw-i5-teknik-ozellikleri-cover-1024x576.jpg',
        'https://arabam-blog.mncdn.com/wp-content/uploads/2020/12/New-Audi-A3-2020-UK-7.jpg',
        'https://i.i-sgcm.com/news/article_reviews/2012/503_1_l.jpg',
        'https://arabam-blog.mncdn.com/wp-content/uploads/2020/12/New-Audi-A3-2020-UK-7.jpg',
      ],
    },
    transmission: {
      id: 3,
      type: 'Hybrid',
    },
    fuel: {
      id: 3,
      type: 'Electric',
    },
    seat: 2,
    createdDate: moment().toDate(),
    updatedDate: moment().toDate(),
  },
];
