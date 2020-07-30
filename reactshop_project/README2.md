# Component Patterns

使いまわしのきくタブとインジケーターなどのコンポーネントを作成するのはどうしたらよいのかを考える。

- Presentational and Container components
- Compount Components
- Render Props Pattern
- Higher-order components

## Container and presentational components

コンポーネントは**Presentation**と**Container**に分割して考えるとコンポーネントが疎結合になり
使いまわしが効く。

- Container component
    - どのように物事が動作するのか(dataを取ってきたり、stateを変更したり)
- Presentation component
    - どのように物事が見えるのか(dataをうけとったりeventハンドラをもっていたり)


これからReactShopのコンポーネントを分割していく。

## Product.tsx

Let's make Presentation Component

``` bash
$ type nul > src\Product.tsx
```

``` typescript: Product.tsx
import * as React from "react";

const Product: React.FC<{}> = (props) => {
  return <React.Fragment>TODO</React.Fragment>;
};

export default Product;
```

Product.tsxはProductPageのPresentationをあらわす。
propsとして商品データをうけとり、買い物かごに入っている、入れる関数を追加する。
ProductPageのJSXを追加する。


``` typescript: Product.tsx
import * as React from "react";
import { IProduct } from "./ProductsData";

interface IProps {
  product: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
}

const Product: React.FC<IProps> = (props) => {
  const product = props.product;

  const handleAddClick = () => {
    props.onAddToBasket();
  };

  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="product-price">
        {new Intl.NumberFormat("un-US", {
          currency: "USD",
          style: "currency",
        }).format(product.price)}
      </p>
      {!this.state.inBasket && (
        <button onClick={handleAddClick}>Add to basket</button>
      )}
    </React.Fragment>
  );
};

export default Product;
```

これをPresentationとしてProductPageに使用したい。

``` typescript: ProductPage.tsx
// 省略
  public render() {
    const product = this.state.product;
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />
        {product ? (
          <Product  // 追加
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
// 省略
```

これで表示部分をPresentation Componentとして代替することができた。

## Compound components

compound componetsは複数のcomponentsを一緒に動かすセットのこと。
Compound componentsとしてTabコンポーネントを作成する。

Tabコンポーネントを使って商品の詳細とレビュー表示をタブで切り替えられるようにしたい。

そのためたには使いまわしのできるタブコンポーネントを作成する必要がある。

`ProductData.ts`にレビューとレビュワーを登録できるように型とデータを変更する。

``` typescript: ProductData.ts
// 型の追加
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
// 省略
```

これをProductのページで見せられるようにしたい。
そのためにはpropsでうけとって表示させる。

``` typescript: Product.tsx
// 省略

  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* // reviews */}
      <div>
        <ul className="product-reviews"> // 追加
          {product.reviews.map((review) => (
            <li key={review.reviewer} className="product-reviews-item">
              <i>"{review.comment}"</i> - {review.reviewer}
            </li>
          ))}
        </ul>
      </div>
      <p className="product-price">
        {new Intl.NumberFormat("un-US", {
          currency: "USD",
          style: "currency",
        }).format(product.price)}
      </p>
      {!props.inBasket && (
        <button onClick={handleAddClick}>Add to basket</button>
      )}
    </React.Fragment>
  );
};
```

とりあえずこれをProductページで見られるようになったが商品詳細とレビューをタブで切りかえたい
そのためにシンプルな`Tab`コンポーネントを作成して切り替えていきたい。
`Tab.tsx`を作成する。

``` bash
$ type nul > src\Tab.tsx
```

まずは一番単純なコンポーネントを作成してみる。

``` typescript: Tabs.tsx
import * as React from "react";

interface IProps {}
interface IState {}

class Tabs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return;
  }
}

export default Tabs;
```

これにpropsとstateを定義していく。

``` typescript: Tabs.tsx
import * as React from "react";

interface IProps {
  headings: string[];
}
interface IState {
  activeHeading: string;
}

class Tabs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeHeading:
        this.props.headings && this.props.headings.length > 0
          ? this.props.headings[0]
          : "",
    };
  }

  private handleTabClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const li = event.target as HTMLElement;
    const heading: string = li.textContent ? li.textContent : "";
    this.setState({ activeHeading: heading });
  };

  public render() {
    return (
      <ul className="tabs">
        {this.props.headings.map((heading) => (
          <li
            onClick={this.handleTabClick}
            className={heading === this.state.activeHeading ? "active" : ""}
          >
            {heading}
          </li>
        ))}
      </ul>
    );
  }
}

export default Tabs;

```

これをProductに組込んでみる

```typescript: Product.tsx
import Tabs from "./Tabs";

// 省略

  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <Tabs headings={["Description", "Reviews"]} />  // 追加
      <p>{product.description}</p>

```

これでタブ表示ができるようになったが、表示内容とタブは紐づいていないので
ただタブが表示されているだけである。内容とタブを連携させていく。

ここでTabsをどういう形であれば理想なのかを示しておく。Tabsの中にTabが内包されてタブが作成されているのがわかる。
この形をCompound形式のコンポーネントと呼ぶ。

``` typescript
<Tabs>
  <Tabs.Tab name="Description" initialActive={True}>
    <b>Description</b>
  </Tabs.Tab>
  <Tabs.Tab>
    Reviews
  </Tabs.Tab>
</Tabs>
```

これを目指して`Tabs.tsx`を変更する。
こうなるとタブの項目をPropsで渡す必要がないことがわかる。

``` typescript: Tabs.tsx
import * as React from "react";

interface IState {
  activeName: string;
}

interface ITabProps {
  name: string; // unique
  initialActive: boolean;
}

class Tabs extends React.Component<{}, IState> {
  public static Tab: React.FC<ITabProps> = (props) => {
    return <li>{props.children}</li>;
  };

  public render() {
    return <ul className="tabs">{this.props.children}</ul>;
  }
}

export default Tabs;
```

ProductPageからProductへ、ProductからTabsへ、TabsからTabへとPropsがPropsが流れ、
各コンポーネントにおいてStateが変更されていく。

どのTabがアクティブなのかはTabsとTabが連携する必要がある。
これだとTabとTabsのstateを共有する必要がある。

ことなるコンポーネント間でstateを共有するにはコンテキストを使用する。

(Compound Componentは複雑すぎる。。ここはコードをみてください。次に進みます)

## Higher-Order Components

**Higher Order Components(HOC)** はコンポーネントをうけとって何らかの処理を追加してコンポーネントを返す関数のこと。
今回は`withLoader`というどんなコンポーネントにも適用できるページローディングにスピナーを追加できるＨＯＣを作成する。

### Adding asynchronous data fetching

現段階だとデータはローカルのプロパティで保持しているので一度に取得しているが、データを非同期で遅延も含めて受け取れる関数を作成する。
これは`ProductData.ts`に実装する。

``` typescript: ProductData.ts
const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getProduct = async (id: number): Promise<IProduct | null> => {
  await wait(1000);
  const foundProducts = products.filter((customer) => customer.id === id);
  return foundProducts.length === 0 ? null : foundProducts[0];
};
```

1秒後にデータが取得できる非同期関数を定義した。これをつかって`ProductPage`からデータを引き抜く。
`ProductPage`のIStateはデータがloading中かどうかを判断するためにstateを追加した。

``` typescript: ProductPage.tsx
interface IState {
  product?: IProduct; // 商品のタイプ
  added: boolean; // 買い物かごへの有無
  loading: boolean; //ローディングかどうか
}

// 省略

  // idをキーにして商品を特定したい
  // RouteComponentPropsのmatchオブジェクトを使用する
  public async componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10); // string から numberに変更
      const product = await getProduct(id); // 追加　// productsからidが一致するものをとりだし
      if (product !== null) {
        this.setState({ loading: false, product: product }); // 編集
      }
    }
  }
```

これで商品詳細ページは1秒タイムラグをもって表示されるようになった。
これを`withLoader`コンポーネントで包括してスピナーを回したい。

``` BASH
$ type nul > src\withLoader.tsx
```

``` typescript: withLoader.tsx
import * as React from "react";

interface IProps {
  loading: boolean;
}

const withLoader = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & IProps> => ({ loading, ...props }: IProps) =>
  loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (
    <Component {...props} />
  );

export default withLoader;
```

これで`Product.tsx`をラップする

```typescript:Product.tsx
import * as React from "react";
import { IProduct } from "./ProductsData";
import withLoader from "./withLoader";

import Tabs from "./Tabs";

interface IProps {
  product?: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
}

const Product: React.FC<IProps> = (props) => {
  const product = props.product;

  const handleAddClick = () => {
    props.onAddToBasket();
  };
  if (!product) {
    return null;
  }
  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <Tabs>
        <Tabs.Tab
          name="Description"
          initialActive={true}
          heading={() => <b>Descriptsion</b>}
        >
          <p>{product.description}</p>
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => "Reviews"}>
          <ul className="product-reviews">
            {product.reviews.map((review) => (
              <li key={review.reviewer} className="product-reviews-item">
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tabs.Tab>
      </Tabs>
      <p className="product-price">
        {new Intl.NumberFormat("un-US", {
          currency: "USD",
          style: "currency",
        }).format(product.price)}
      </p>
      {!props.inBasket && (
        <button onClick={handleAddClick}>Add to basket</button>
      )}
    </React.Fragment>
  );
};

export default withLoader(Product);
```

`Product`にPropsを流す必要があるので`ProductPage`を一部変更する

``` typescript: ProductPage.tsx
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
```

## Creating a form with controlled components

formはReactのコンポーネントからいうと`controlled components`と呼ばれる。
controlled copmonentはstateと同期している。
これを問い合わせ画面を作りながら学んでいく。

``` BASH
$ type nul > src\ContactUsPage.tsx
```

formのコンポーネントはcontainerとPresentationに分けられ、ホストはcontainerになる。
まずは土台となるページを作成してRoutesに追加する

```typescript: ContactUsPage.tsx
import * as React from "react";

class ContactUsPage extends React.Component {
  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          If you enter your details we'll get back to you as soon as we can.
        </p>
      </div>
    );
  }
}

export default ContactUsPage;
```

``` typescript:Routes.tsx
import ContactUsPage from "./ContactUsPage"

// 省略

  <Switch>
    <Redirect exact={true} from="/" to="/products" />
    <Route exact={true} path="/products" component={ProductsPage} />
    <Route path="/products/:id" component={ProductPage} />
    <Route path="/contactus" component={ContactUsPage} />
    <Route path="/admin">
      {loggedIn ? (
        <Suspense
          fallback={<div className="page-container">Loading...</div>}
        >
          <AdminPage />
        </Suspense>
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
    <Route path="/login" component={LoginPage} />
    <Route component={NotFoundPage} />
  </Switch>
// 省略
```

Headerにも追加する。

``` typescript: Header.tsx
// 省略
<nav>
  <NavLink
    to="/products"
    className="header-link"
    activeClassName="header-link-active"
  >
    Products
  </NavLink>
  <NavLink
    to="/contactus"
    className="header-link"
    activeClassName="header-link-active"
  >
    Contact Us
  </NavLink>
  <NavLink
    to="/admin"
    className="header-link"
    activeClassName="header-link-active"
  >
    Admin
  </NavLink>
</nav>
// 省略
```

Contact Us タブとページは表示できるようになったのでinputを作成していく。

### Creating controlled inputs

`ContactUs.tsx`を作成してform部分を作成する

``` BASH
$ type nul > src\ContactUs.tsx
```

``` typescript:ContactUs.tsx
import * as React from "react";

const ContactUs: React.FC = () => {
  return (
    <form className="form" noValidate={true}>
      <div className="form-group">
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" />
      </div>
    </form>
  );
};

export default ContactUs;
```

これをContactUsPageに追加する

```typescript: ContactUsPage
class ContactUsPage extends React.Component {
  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          If you enter your details we'll get back to you as soon as we can.
        </p>
        <ContactUs />
      </div>
    );
  }
}
```

名前入力欄が表示された。この機能を追加していく。
入力があるとContactUsPageのstateが変化したと見なす。
stateをつくっていく。

``` tyescript: ContavtUsPage.tsx
