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
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/users/:id" component={AdminUser} />
    </div>
  );
};

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
          <li key={user.id}>
            <NavLink
              to={`/admin/users/${user.id}`}
              activeClassName="admin-link-active"
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

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

export default AdminPage;
