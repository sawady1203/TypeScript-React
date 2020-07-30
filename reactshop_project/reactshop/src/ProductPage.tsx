import * as React from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { IProduct, getProduct } from "./ProductsData";
import Product from "./Product";

// pathからのパラメータを取得するのに必要な型定義
type Props = RouteComponentProps<{ id: string }>;

// 表示するProductのstateタイプ
// 買い物かごに入っていない場合も考慮してproductは省略可能とした
interface IState {
  product?: IProduct; // 商品のタイプ
  added: boolean; // 買い物かごへの有無
  loading: boolean; //ローディングかどうか
}

class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
      loading: true, // 初期値
    };
  }

  // idをキーにして商品を特定したい
  // RouteComponentPropsのmatchオブジェクトを使用する
  public async componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10); // string から numberに変更
      const product = await getProduct(id);
      // const product = products.filter((p) => p.id === id)[0]; // productsからidが一致するものをとりだし
      if (product !== null) {
        this.setState({ loading: false, product: product });
      }
    }
  }
  // 買い物かごへの追加
  public handleAddClick = () => {
    this.setState({ added: true });
    console.log("product was added to basket!");
  };

  // Promptによるメッセージ
  private navAwayMessage = () => {
    return "Are you sure you leave without buying this product?";
  };

  public render() {
    const product = this.state.product;
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />
        {product || this.state.loading ? (
          <Product
            loading={this.state.loading}
            product={product}
            inBasket={this.state.added}
            onAddToBasket={this.handleAddClick}
          />
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }
}

export default ProductPage;
