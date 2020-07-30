import * as React from "react";

interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}

interface ITabProps {
  name: string; // unique
  initialActive?: boolean;
  heading: () => string | JSX.Element;
}

// コンポーネント間で共有されるべきもの
interface ITabContext {
  activeName?: string; // なにもactiveじゃない可能性もあるので
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

// 引数にはデフォルト値を入れるが何を入れたら良いのか分からないので空{}でOK
const TabsContext = React.createContext<ITabContext>({});

class Tabs extends React.Component<{}, IState> {
  public static Tab: React.FC<ITabProps> = (props) => {
    return (
      <TabsContext.Consumer>
        {(context: ITabContext) => {
          if (!context.activeName && props.initialActive) {
            if (context.handleTabClick) {
              context.handleTabClick(props.name, props.children);
            }
            return null;
          }
          const activeName = context.activeName
            ? context.activeName
            : props.initialActive
            ? props.name
            : "";
          const handleTabClick = (event: React.MouseEvent<HTMLElement>) => {
            if (context.handleTabClick) {
              context.handleTabClick(props.name, props.children);
            }
          };
          return (
            <li
              onClick={handleTabClick}
              className={props.name === activeName ? "active" : ""}
            >
              {props.heading()}
            </li>
          );
        }}
      </TabsContext.Consumer>
    );
  };

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name });
    this.setState({ activeContent: content });
  };

  public render() {
    console.log(this.state);
    // console.log(this.state.activeContent);

    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick,
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }
}

export default Tabs;
