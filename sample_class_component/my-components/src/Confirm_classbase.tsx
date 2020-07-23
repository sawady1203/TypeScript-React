import * as React from "react";
import "./Confirm.css";

interface IProps {
  open: boolean; // ダイアログが表示されるかどうか
  title: string;
  content: string;
  cancelCaption?: string;
  okCaption?: string;
  onOkClick: () => void; // propsから渡す関数
  onCancelClick: () => void; // propsから渡す関数
}

class Confirm extends React.Component<IProps> {
  public static defaultProps = {
    cancelCaption: "Cancel",
    okCaption: "Okay",
  };

  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      confirmOpen: true,
    };
  }

  // これだとthisがConfirmクラスをさしていなくてthis.propsがundifinedになる
  // private handleOkClick() {
  //   console.log("OK Clicked!", this.props);
  // }

  private handleOkClick = () => {
    // console.log("Ok, Clicked!", this.props);
    this.props.onOkClick();
  };

  private handleCancelClick = () => {
    this.props.onCancelClick();
  };

  public render() {
    return (
      <div
        className={
          this.props.open
            ? "confirm-wrapper confirm-visible"
            : "confirm-wrapper"
        }
      >
        <div className="confirm">
          <div className="confirm-title-container">
            <span>{this.props.title}</span>
          </div>
          <div className="confirm-content-container">
            <p>This is where our content should go</p>
          </div>
          <div className="confirm-button-container">
            <button
              className="confirm-cancel"
              onClick={this.props.onCancelClick}
            >
              {this.props.cancelCaption}
            </button>
            <button className="confirm-ok" onClick={this.handleOkClick}>
              {this.props.okCaption}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
