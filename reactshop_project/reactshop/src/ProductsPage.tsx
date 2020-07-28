import * as React from "react";
import { IProduct, products } from "./ProductsData";
import { Link, RouteComponentProps } from "react-router-dom";

// コンポーネントではstateとpropsの型をまず定義する
interface IState {
  products: IProduct[];
  search: string;
}

class ProductsPage extends React.Component<RouteComponentProps, IState> {
  public constructor(props: RouteComponentProps) {
    super(props); // propsをうけとる
    this.state = {
      products: [], // stateの初期値
      search: "",
    };
  }
  // コンポーネントが読み込まれたタイミング
  public componentDidMount() {
    this.setState({ products: products });
  }

  public static getDerivedStateFromProps(
    props: RouteComponentProps,
    state: IState
  ) {
    // クエリパラメータをsearchをキーにして探す
    const searchParams = new URLSearchParams(props.location.search);
    const search = searchParams.get("search") || "";
    return {
      products: state.products,
      search,
    };
  }

  public render() {
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS!
        </p>
        <ul className="product-list">
          {this.state.products.map((product) => {
            // mapで取得したproductがstateのsearchと一致しているかどうかを判断する
            if (
              !this.state.search ||
              (this.state.search &&
                product.name
                  .toLowerCase()
                  .indexOf(this.state.search.toLowerCase()) > -1)
            ) {
              return (
                <li key={product.id} className="product-list-item">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default ProductsPage;
