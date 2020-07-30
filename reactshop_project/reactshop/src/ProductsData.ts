export interface IReview {
  comment: string;
  reviewer: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  reviews: IReview[];
}

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getProduct = async (id: number): Promise<IProduct | null> => {
  await wait(1000);
  const foundProducts = products.filter((customer) => customer.id === id);
  return foundProducts.length === 0 ? null : foundProducts[0];
};

export const products: IProduct[] = [
  {
    id: 1,
    name: "React Router",
    price: 8,
    description:
      "A Colelction of navigational components that compose declaratively with your app",
    reviews: [
      {
        comment: "Excellent! this does everythin I want",
        reviewer: "Billy",
      },
    ],
  },
  {
    id: 2,
    name: "React Redux",
    price: 12,
    description: "A library that helps manage state across your app",
    reviews: [
      {
        comment: "I've found this really usefull in a large app I'm working on",
        reviewer: "Billy",
      },
      {
        comment: "A bit confusiong at first but simple when you got used to it",
        reviewer: "Sally",
      },
    ],
  },
  {
    id: 3,
    name: "React Apollo",
    price: 12,
    description: "A library that helps you interact with a GraphQL backend",
    reviews: [
      {
        comment: "I'll never work with a REST API again!",
        reviewer: "Billy",
      },
      {
        comment: "It makes working with GraphQL backends a breeze",
        reviewer: "Sally",
      },
    ],
  },
];
