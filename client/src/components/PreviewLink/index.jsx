import { Icon } from "@iconify/react";
import "./index.css";
import PropTypes from "prop-types";

export default function PreviewLink({ linkData, removeLink, removeShop }) {
  return (
    <div className="preview-link special-input-layer">
      <label className="special-label">{linkData?.title}</label>
      <label className="special-label">{linkData?.url}</label>
      <div className="preview-link-footer">
        <div className="link-click special-label">
            <Icon icon="material-symbols:image-outline" />
            <Icon icon="material-symbols:bar-chart" />
            <span>{linkData?.clickCount || 0} clicks</span>
        </div>
        <div className="link-delete">
            <Icon icon="ion:trash-outline" onClick={() => linkData?.type !== "OT" ? removeLink(linkData._id) : removeShop(linkData._id)} />
        </div>
      </div>
    </div>
  )
}

PreviewLink.propTypes = {
    linkData: PropTypes.obj,
    removeLink: PropTypes.func,
    removeShop: PropTypes.func
}


