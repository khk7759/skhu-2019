const categories = [
  {
    id: 'MainBorder',
    name: '알림게시판',
    tags: ['All', 'notice'],
    /* count: 147, */
    image: require('../assets/icons/plants.png')
  },
  {
    id: 'BoardTab',
    name: '자유게시판',
    tags: ['All', 'notice'],
    /*  count: 16, */
    image: require('../assets/icons/seeds.png')
  },
  {
    id: 'TimeTable',
    name: '시간표',
    tags: ['All', 'service'],
    /* count: 68, */
    image: require('../assets/icons/flowers.png')
  },
  {
    id: 'TodoTab',
    name: 'todo List',
    tags: ['All', 'service'],
    /* count: 17, */
    image: require('../assets/icons/sprayers.png')
  },
  {
    id: 'chatScreen',
    name: 'chat',
    tags: ['All', 'service'],
    /* count: 47, */
    image: require('../assets/icons/pots.png')
  },
  {
    id: '미정2',
    name: '미정2',
    tags: ['All', 'no'],
    /* count: 47, */
    image: require('../assets/icons/fertilizers.png')
  },
];

const products = [
  {
    id: 1,
    name: '16 Best Plants That Thrive In Your Bedroom',
    description: 'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
    ]
  }
];

const explore = [
  // images
  require('../assets/images/explore_1.png'),
  require('../assets/images/explore_2.png'),
  require('../assets/images/explore_3.png'),
  require('../assets/images/explore_4.png'),
  require('../assets/images/explore_5.png'),
  require('../assets/images/explore_6.png'),
];

const profile = {
  username: '조준서',
  location: 'Europe',
  password: '12345',
  email: 'coogys@naver.com',
  avatar: require('../assets/images/avatar.png'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};



export {
  categories,
  explore,
  products,
  profile,
}