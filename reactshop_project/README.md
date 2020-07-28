# ReactShop

## 環境構築

This project is developed with React and TypeScript

``` BASH
$ npx create-react-app reactshop --typescript
$ cd reactshop
$ npm install react react-dom react-router-dom
$ npm install tslint tslint-react tslint-config-prettier @tyeps/react-router-dom --save-dev
$ type nul > tslint.json
```

tslint.jsonを作成する

``` json
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "rules": {
    "ordered-import": false,
    "object-literal-sort-keys": false,
    "no-debugger": false,
    "no-console": false
  },
  "linterOption": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}
```

必要のないコンポーネントを削除する
- Appコンポーネントとそれに関係するもの
- serviceWorker.ts
- index.tsxから削除したコンポーネントのインポートを削除

``` BASH
# Appコンポーネント関係をまとめて削除
$ del src\App.*
$ del src\serviceWorker.ts
```

``` typescript : index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(<div />, document.getElementById("root"));
```

## Routesの設定

`BrowserComponent`と`Route`コンポーネントを使ってページを定義していきたい。
`BrowserComponent`は`Route`コンポーネントの一番topのコンポーネントであり、子コンポーネントの`Route`コンポーネントをページパス別に探していく。

まずは商品一覧となる`ProductsPage.tsx`と、その商品のデータ参照元となる`ProductsData.ts`を作成する。

### ProductsPage(商品一覧)

``` BASH
$ type nul > src\ProductsPage.tsx
$ type nul > src\ProductsData.ts
```

``` typescript : PRoductsData.ts
export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const Products: IProduct[] = [
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

```

これを読み込んで`ProductsPage.tsx`で商品一覧を作成したい。

``` typescript: ProductsPage.tsx
import * as React from "react";
import { IProduct, products } from "./ProductsData";

// コンポーネントではstateとpropsの型をまず定義する
interface IState {
  products: IProduct[];
}

class ProductsPage extends React.Component<{}, IState> {
  public constructor(props: {}) {
    super(props), // propsをうけとる
      (this.state = {
        products: [], // stateの初期値
      });
  }
  // コンポーネントが読み込まれたタイミング
  public componentDidMount() {
    this.setState({ products });
  }

  public render() {
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS!
        </p>
        <ul className="product-list">
          {this.state.products.map((product) => {
            <li key={product.id} className="product-list-item">
              {product.name}
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default ProductsPage;

```

`index.css`に`ProductsPage.tsx`のcssを追加する

```css : index.css
.page-container {
  text-align: center;
  padding: 20p;
  font-size: large;
}

.product-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.product-list-item {
  padding: 5px;
}
```

### Admin(管理画面)

次に管理画面機能として`AdminPage.tsx`を作成する。

``` BASH
$ type nul > src\AdminPage.tsx
```

``` typescript : Admin.tsx
import * as React from "react";

const AdminPagePage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Admin</h1>
      <p>You should only be here if you have logged in.</p>
    </div>
  );
};

export default AdminPage;
```

### Routes.tsx

`ProductsPage`と`Admin`を作成したのでこれらをルーティングするコンポーネントを作成する。

``` BASH
$ type nul > src\Route.tsx
```

ルーティングには`BrowserRouter`を使用するが、長いので`Router`としている。

``` typescript: Route.tsx
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Route path="/products" component={ProductsPage} />
        <Route path="/admin" component={AdminPage} />
      </div>
    </Router>
  );
};

export default Routes;
```

これを`index.tsx`に読み込ませる

``` typescript: index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Route";

ReactDOM.render(<Routes />, document.getElementById("root"));
```

これで`/products`と`/admin`へのルーティングとコンポーネントの表示ができた。

## Creating Navigation

React Routerはナビゲーションを作成するのに非常に優れているコンポーネントなので実装していく。

### Link component

Link ComponentはReact Routerのコンポーネントの一部でナビゲーションオプションを設定することが出来るコンポーネント。

#### Header.tsx

ページのヘッダー機能作成していく。

``` BASH
$ type nul > src\Header.tsx
```

ヘッダーから`ProductsPage`や`Admin`ページに飛ばしたい、つまりナビゲーションしたい。
`<Link />`コンポーネントは表示しているテキストがどのパスにリンクしているのかを定義して
ナビゲーションしてくれる。

```typescript: Header.tsx

import * as React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <Link to="/products" className="header-link">
          Products
        </Link>
        <Link to="/admin" className="header-link">
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
```

index.cssを追加する。

``` css : index.css
.header {
  text-align: center;
  background-color: #222;
  height: 160px;
  padding: 20px;
  color: white;
}

.header-logo {
  animation: header-logo-spin infinite 20s linear;
  height: 80px;
}

@keyframes header-log-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.header-title {
  font-size: 1.5em;
}

.header-link {
  color: #fff;
  text-decoration: none;
  padding: 5px;
}
```

`Header`コンポーネントを作成したので`Route.tsx`に追加する

``` typescript: Route.tsx
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import Header from "./Header";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/products" component={ProductsPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/admin" component={AdminPage} />
      </div>
    </Router>
  );
};

export default Routes;
```

これでトップページ`/`はヘッダーを表示して、追加したLinkをクリックすると`/products`と`/admin`が表示される。
React Routerはナビゲーションをフロントエンド内で行っていることがわかる。

#### NavLinkコンポーネント

ReactRouterは`NavLink`というコンポーネントも持っているので試してみる.
`NavLink`はアクティブなLinkと`<Link />`コンポーネントをハイライトさせることができる。

``` typescript: Header.tsx
import * as React from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "./logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink to="/products" className="header-link">
          Products
        </NavLink>
        <NavLink to="/admin" className="header-link">
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
```

`Link`を`NavLink`に変更しただけではなにも変わらない。
`NavLink`の`activeClassName`を追加することで`link`にスタイルが適用される。

``` typscript: Header.tsx
import * as React from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "./logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          className="header-link"
          activeClassName="header-link-actiev"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin"
          className="header-link"
          activeClassName="header-link-actiev"
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
```

`activeClassName`にCSSを追加する。

``` CSS: index.css
.header-link-active {
  border-bottom: #ebebeb solid 2px;
}
```

これで表示しているナビゲーション下に下線がひかれるようになった。

### Productページ(商品詳細ページ)

Productページは`/products/{id}`のように`product id`をつかって`/product`パスの階層下に置きたい。
`Routes.tsx`に`ProductPage`へのルーティングを追加する。

``` typescript: Routes.tsx
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import Header from "./Header";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/products" component={ProductsPage} />
        <Route path="/products/:id" component={ProductPage} /> // 追加
        <Route path="/admin" component={AdminPage} />
      </div>
    </Router>
  );
};

export default Routes;
```

`ProductPage.tsx`を作成する。

``` BASH
$ type nul > src\ProductPage.tsx
```

react-router-domの`RouteComponentProps`コンポーネントを使用することでpathにある`id`を取得することができる。
`RouteComponentProps`はパスのパラメータをpropsとして受け取るのでこの型をGenericsで定義する。

``` typescript: ProductPage.tsx
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IProduct, products } from "./ProductsData";

// pathからのパラメータを取得するのに必要な型定義
type Props = RouteComponentProps<{ id: string }>;

// 表示するProductのstateタイプ
// 買い物かごに入っていない場合も考慮してproductは省略可能とした
interface IState {
  product?: IProduct; // 商品のタイプ
  added: boolean; // 買い物かごへの有無
}

class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
    };
  }

  // idをキーにして商品を特定したい
  // RouteComponentPropsのmatchオブジェクトを使用する
  public componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10); // string から numberに変更
      const product = products.filter((p) => p.id === id)[0]; // productsからidが一致するものをとりだし
      this.setState({ added: false, product: product });
    }
  }

  public handleAddClick = () => {
    this.setState({ added: true });
    console.log("product was added to basket!");
  };

  public render() {
    const product = this.state.product;
    return (
      <div className="page-container">
        {product ? (
          <React.Fragment>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p className="product-price">
              {new Intl.NumberFormat("un-US", {
                currency: "USD",
                style: "currency",
              }).format(product.price)}
            </p>
            {!this.state.added && (
              <button onClick={this.handleAddClick}>Add to basket</button>
            )}
          </React.Fragment>
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }
}

export default ProductPage;
```

productが存在するかどうかの三項演算子で判断する。
`Route`に`ProductPage`を追加する。
ただそのまま追加すると`/products/:id`や`/products/`も同様に`/products`ページが表示されてしまうので、
`/products`パスについては完全一致のみを適用する。

``` typescript Rroute.tsx

import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage"; // 追加
import Header from "./Header";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact={true} path="/products" component={ProductsPage} /> // 完全一致のみ
        <Route path="/products/:id" component={ProductPage} /> // 追加
        <Route path="/admin" component={AdminPage} />
      </div>
    </Router>
  );
};

export default Routes;
```

商品一覧ページ`ProductsPage`から商品詳細ページ`ProductPage`へのリンクが張られていないので`Link`コンポーネントで追加する。

``` typescript : ProductsPage.tsx
import * as React from "react";
import { IProduct, products } from "./ProductsData";
import { Link } from "react-router-dom";  // 追加

// コンポーネントではstateとpropsの型をまず定義する
interface IState {
  products: IProduct[];
}

class ProductsPage extends React.Component<{}, IState> {
  public constructor(props: {}) {
    super(props); // propsをうけとる
    this.state = {
      products: [], // stateの初期値
    };
  }
  // コンポーネントが読み込まれたタイミング
  public componentDidMount() {
    this.setState({ products: products });
  }

  public render() {
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS!
        </p>
        <ul className="product-list">
          {this.state.products.map((product) => (
            <li key={product.id} className="product-list-item">
              <Link to={`/products/${product.id}`}>{product.name}</Link> // 追加
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductsPage;

```

### Not Fonund Page

どのパスにも属さない場合に`Nont Found Page`を表示させたい。
その場合には`Route`を`Switch`コンポーネントでくくると最初にマッチしたパスをもつ`Route`コンポーネントのみをレンダリングするため、
どのパスにもマッチしない場合、パスを指定していない`NotFoundPage`にパスを振り分けるようになる。
パスが存在しない場合は`NotFoundPage`に飛ばされるようになる。

`NotFoundPage`をつくっていく。

``` BASH
$ type nul > src\NotFoundPage.tsx
```

``` typescript: NotFoundPage.tsx
import * as React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="page-con">
      <h1>Sorry, this page cannot be found</h1>
    </div>
  );
};
```

これを`Routes.tsx`に追加する。

``` typescript: Routes.tsx
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/products" component={ProductsPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
```

これで用意していないパスへは`Page not Found`が表示されるようになった。

### Redirect

ルートパスである`/`へアクセスすると`NotFoundPage`にとんでしまうので`ProductsPage`にリダイレクトするようにしたい。
これは`Routes.tsx`ないで設定を追加するこで可能になる。これには`Redirect`コンポーネントを`Router`に追加する。

``` typescript: Routes.tsx
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect, // 追加
} from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Redirect exact={true} from="/" to="/prodacts" />  // 追加
          <Route exact={true} path="/products" component={ProductsPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
```

### 条件付きRedirect

Redirectさせたいシーンとしてはuserがログインしているかどうかによって特定のページを表示させる/させないを決めたいなどがある。
今回はログインページを作成して**state**をつかってログインしているかどうかを判断する。

`LoginPage`を作成する。

``` bash
$ type nul > src\LoginPage.tsx
```


``` typescript: LoginPage
import * as React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Login</h1>
      <p>You need to login ...</p>
    </div>
  );
};

export default LoginPage;
```

コンポーネントをつくったらRoutesに追加する。
ただ追加するだけでは意味ないのでログインしているかどうかをstateで管理する。


``` typescript: Routes.tsx
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

const Routes: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Redirect exact={true} from="/" to="/products" />
          <Route exact={true} path="/products" component={ProductsPage} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/admin">
            {loggedIn ? <AdminPage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

```

## Query prameters

検索機能などを追加したい場合、URLに`/products?search=redux`のようにクエリパラメータを追加して検索機能を実装することができる。
クエリパラメータは変化するのでstateとして扱う。
`ProductsPage`に型を追加する。

``` typescript: ProductsPage.tsx
interface IState {
  products: IProduct[];
  search: string;
}
```

URLからクエリパラメータを取得するために`RouteComponentProps`をつかう。
`RouteComponentProps`からクエリパラメータをPropsとして受け取るのでPropsの型を追加する。
クエリパラメータは`props.location.search`で取得することができる。
クエリパラメータを綺麗に修正するために組込関数である`URLSearchParams`関数を使用する。
クエリパラメータをPropsとして受け取り、そのタイミングで`URLSearchParams`関数を実行するには`getDerivedStateFromProps`メソッドを使用する。

``` typescript: ProductsPage.tsx
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

```

このクエリパラメータを入れる検索機能は`Header.tsx`から入力させたいので,Headerコンポーネントにstateを追加する。
inputボックスに入力された値をsearchに割り当て、キーが押されたら`props.history.push`でURLにクエリパラメータを追加して遷移させる。
`props.history`を利用するためにはコンポーネントを`withRouter`で包む必要がある。

``` typescript: Header.tsx
import * as React from "react";
// import { Link } from "react-router-dom";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import logo from "./logo.svg";

const Header: React.FC<RouteComponentProps> = (props) => {
  // クエリパラメータの初期値には空文字を追加
  // これをURLにくみこんでなんとかしたい
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const searchParams = new URLSearchParams(props.location.search);
    setSearch(searchParams.get("search") || "");
  }, []); // コンポーネントが読まれたときに第2引数が第1引数について書き換える

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const handleSearchKeydown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // enterが押されたらstateの値をクエリパラメータに渡したい
    if (event.key === "Enter") {
      props.history.push(`/products?search=${search}`);
    }
  };

  return (
    <header className="header">
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeydown}
        />
      </div>
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          className="header-link"
          activeClassName="header-link-active"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin"
          className="header-link"
          activeClassName="header-link-active"
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

export default withRouter(Header);
```

inputタグ部分についてcssを追加します

``` css
.search-container {
  text-align: right;
  margin-bottom: -25px;
}
```

これで検索機能が実装できた

## Route Prompt

userが商品詳細ページを見ていて買い物かごに商品を追加せずにページを移動する場合、「本当にページを離れるかどうか」を問いかけたい。
これを実現するには`React Router`の`Prompt`コンポーネントを利用する。
`Prompt`コンポーネントはある指定した状態になった場合に確認ダイアログを起動させることができる。

`ProductPage`で実装する。

``` typescript: ProductPage.tsx
import { RouteComponentProps, Prompt } from "react-router-dom"; // 追加

class ProductPage extends React.Component<Props, IState> {

  // 省略

  // Promptによるメッセージ
  private navAwayMessage = () => {
    return "Are you sure you leave without buying this product?";
  };

  public render() {
    const product = this.state.product;
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} /> // 追加
        {product ? (
          <React.Fragment>
            <h1>{product.name}</h1>
// 省略
```

## Nested routes

URLの階層が深くなった場合、複数のコンポーネントを表示させたいときがある。
Adminページでこれを実装する。
今回は3階層深くなる。

- 1: UsersとProducts
- 2: all Users
- 3: 選択されたuserの情報

URLの情報を使うので`react-router-dom`の`RouteComponentProps`を使う。
リンクを表示するのに`NavLink`を使用する。
また、子コンポーネントをレンダリングするのに`Route`を使用する。

まずはNavLinkをつかってメニューだけを表示させてみる

``` typescript: AdminPage.tsx
import * as React from "react";
import { NavLink, Route, RouteComponentProps } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Admin Panel</h1>
      <ul className="admin-section">
        <li key="users">
          <NavLink to={`/admin/users`} activeClassName="admin-link-active">
            Users
          </NavLink>
        </li>
        <li key="products">
          <NavLink to={`/admin/products`} activeClassName="admin-link-active">
            Products
          </NavLink>
        </li>
      </ul>
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/products" component={AdminProducts} />
    </div>
  );
};

export default AdminPage;
```

この状態にRouteコンポ―ネントを追加していきたい。　　

``` typescript : AdminPage
import * as React from "react";
import { NavLink, Route, RouteComponentProps } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Admin Panel</h1>
      <ul className="admin-sections">
        <li key="users">
          <NavLink to={`/admin/users`} activeClassName="admin-link-active">
            Users
          </NavLink>
        </li>
        <li key="products">
          <NavLink to={`/admin/products`} activeClassName="admin-link-active">
            Products
          </NavLink>
        </li>
      </ul>
      <Route path="/admin/users" component={AdminUsers} /> // 追加
      <Route path="/admin/products" component={AdminProducts} /> // 追加
      <Route path="/admin/users/:id" component={AdminUser} /> // 追加
    </div>
  );
};

export default AdminPage;
```

NavLinkをクリックするとRouteが表示されるようにした。
`AdminUsers`と`AdminProducts`を`AdminPage`に追加していく。

``` typescript: AdminPage.tsx

const AdminProducts: React.FC = () => {
  return <div>Some Options to administer products</div>;
};

// adminuserの型
interface IUser {
  id: number;
  name: string;
  isAdmin: boolean;
}

// adminuserのデータ
const adminUserData: IUser[] = [
  {
    id: 1,
    name: "Fread",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Bob",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Jane",
    isAdmin: true,
  },
];

const AdminUsers: React.FC = () => {
  return (
    <div>
      <ul className="admin-sections">
        {adminUserData.map((user) => (
          <li>
            <NavLink
              to={`/admin/users/${user.id}`}
              activeClassName="admin-link-active">
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

AdminUserは名前をクリックすると詳細が見られるようにした。
詳細をURLから指定したい。user詳細のコンポーネントを追加する。

``` typescript: AdminPage.tsx
// 省略
      </ul>
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/users/:id" component={AdminUser} />
    </div>
// 省略

// URLからidを取得してuser情報を表示させたい
const AdminUser: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  let user: IUser;
  if (props.match.params.id) {
    const id: number = parseInt(props.match.params.id, 10);
    user = adminUserData.filter((u) => u.id === id)[0];
  } else {
    return null;
    console.log("no matching user id");
  }
  return (
    <div>
      <div>
        <b>ID: </b>
        <span>{user.id.toString()}</span>
      </div>
      <div>
        <b>Is Admin: </b>
        <span>{user.isAdmin.toString()}</span>
      </div>
    </div>
  );
};

```

これでNested RouteをAdminページで実現することができた。

## Animated transtions

userが別のページへ移動するときにアニメーションを適用したい。
そのときには`TransitionGroup`と`CSSTranstion`を使用する。
これらは`react-transition-group`パッケージに含まれているのでインストールする必要がある。

``` BASH
$ yarn add react-transition-group
$ yarn add @types/react-transition-group --save-dev
```

`TransitionGroup`は子コンポーネントの全てのstateの状態を記録し、子コンポーネントの出入りを計算している。
`CSSTransition`は`TransitionGroup`からコンポーネントが出入りしたかどうかを見張り、その状態によってCSSを適用している。
したがって、`TransionGroup`と`CSSTranstion`は全てのRouteをラップしてCSSクラスを適用している。

`Route.tsx`のRouteをラップする。

`TransitionGroup`には子要素が変化したかを見張るため、ユニークキーを設定する必要がある。
そのユニークキーとして`props.location`を使用するため、`RouteConponentProps`をPropsの型に設定した。

``` typescript
import * as React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps, // 追加
} from "react-router-dom";
import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";

const Routes: React.FC<RouteComponentProps> = (props) => { // propsをRouteComponentPropsとして追加
  // trueだとログインしていることになるのでadminページがみられる
  const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <Router>
      <div>
        <Header />
        <TransitionGroup> // 追加
          <CSSTransition // 追加
            key={props.location.key} // ユニークキー
            timeout={500}
            classNames="animate"
          >
            <Switch>
              <Redirect exact={true} from="/" to="/products" />
              <Route exact={true} path="/products" component={ProductsPage} />
              <Route path="/products/:id" component={ProductPage} />
              <Route path="/admin">
                {loggedIn ? <AdminPage /> : <Redirect to="/login" />}
              </Route>
              <Route path="/login" component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </Router>
  );
};

export default Routes;
```

animation用のCSSを追加する。

``` CSS
.animate-enter {
  opacity: 0;
  z-index: 1;
}

.animate-enter-active {
  opacity: 1;
  transition: opacity 450ms ease-in;
}

.animate-exit {
  display: none;
}
```

この状態だと`index.tsx`において`<Route />`にpropsを渡すことになるので下記のようなエラーになる。

```
    4 | import Routes from "./Routes";
    5 |
  > 6 | ReactDOM.render(<Routes />, document.getElementById("root"));
      |                  ^
    7 |
```

このために`Routes`をラップするコンポーネントを別に作成する。

``` typescript: Routes.tsx

const RoutesWrap: React.FC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

export default RoutesWrap;
```

これでエラーは解消されてanimationが適用された。

## Lazy Loading routes

現状のままだと全てまとめてloadされるが、必要なコンポーネントを必要なときだけロードさせた方が初期ロードが軽い。
これを`lazy loading`と呼び、これを実現するには`Suspense`を使用する。

lazy loadinを`AdminPage`に適用する。`Routes.tsx`でAdminPageをインポートするときにlazyローディングを適用する。

``` typescript: Routes.tsx
const AdminPage = React.lazy(() => import("./AdminPage"));
```

`AdminPage`にローディングを追加する。

``` typescript: Routes.tsx
<Route path="/admin">
  {loggedIn ? (
    <Suspense fallback={<div className="page-container">Loading...</div>}>
      <AdminPage />
    </Suspense>
  ) : (
    <Redirect to="/login" />
  )}
</Route>
```

