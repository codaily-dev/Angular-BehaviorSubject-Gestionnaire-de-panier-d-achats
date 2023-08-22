export type Product = {
  id: string;
  label: string;
  price: number;
};

export type CartProduct = Product & {
  quantity: number;
};
