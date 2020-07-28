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
