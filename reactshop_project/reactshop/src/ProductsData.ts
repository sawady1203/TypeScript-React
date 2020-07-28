export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const products: IProduct[] = [
  {
    id: 1,
    name: "React Router",
    price: 8,
    description:
      "A Colelction of navigational components that compose declaratively with your app",
  },
  {
    id: 2,
    name: "React Redux",
    price: 12,
    description: "A library that helps manage state across your app",
  },
  {
    id: 3,
    name: "React Apollo",
    price: 12,
    description: "A library that helps you interact with a GraphQL backend",
  },
];
