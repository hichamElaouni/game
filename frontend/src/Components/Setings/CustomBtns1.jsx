

import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Update from "@material-ui/icons/UpdateSharp";
import Send from "@material-ui/icons/SendRounded";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Add from "@material-ui/icons/Add";

import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CustomBtns1(props) {
    const {
        lstBtns,
        id
    } = props;







    return (
        <div className="List-Btns">
            {lstBtns.map((btn, key) => (
                <IconButton
                    key={key}
                    id={id}
                    aria-label={btn.aria}
                    style={{
                        color: btn.color,
                        background: btn.background,
                    }}
                    onClick={
                        btn.handclick
                    }
                >
                    {btn.btn}
                </IconButton>
            ))}

        </div>
    );
}


