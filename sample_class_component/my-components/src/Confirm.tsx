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

// function component
// stateless functional component(SFC)
// 関数コンポーネントはrender()メソッドがいらない
//

const Confirm: React.SFC<IProps> = (props) => {
  console.log("Confirm rendering");

  const [cancelClickCount, setCancelClickCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Confirm rendering");
    return () => {
      console.log("confirm unmounted");
    };
  }, []);

  const handleOkClick = () => {
    // console.log("Ok, Clicked!", this.props);
    props.onOkClick();
  };

  const handleCancelClick = () => {
    const newCount = cancelClickCount + 1;
    setCancelClickCount(newCount);
    if (newCount >= 2) {
      props.onCancelClick();
    }
  };

  return (
    <div
      className={
        props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper"
      }
    >
      <div className="confirm">
        <div className="confirm-title-container">
          <span>{props.title}</span>
        </div>
        <div className="confirm-content-container">
          <p>This is where our content should go</p>
        </div>
        <div className="confirm-button-container">
          <button className="confirm-cancel" onClick={handleCancelClick}>
            {cancelClickCount === 0 ? props.cancelCaption : "Really?"}
          </button>
          <button className="confirm-ok" onClick={handleOkClick}>
            {props.okCaption}
          </button>
        </div>
      </div>
    </div>
  );
};
Confirm.defaultProps = {
  cancelCaption: "Cancel",
  okCaption: "Okay",
};
const ConfirmMemo = React.memo(Confirm);
export default ConfirmMemo;
