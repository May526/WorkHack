import "./Topbar.css";
import {
  Folder,
  LocalOffer,
  CardGiftcard,
  Favorite,
  PlayCircleFilled,
  Settings,
} from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">What are you doing?</div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Folder className="topbarIcon"/>
          </div>
          <div className="topbarIconContainer">
            <LocalOffer className="topbarIcon"/>
          </div>
          <div className="topbarIconContainer">
            <CardGiftcard className="topbarIcon"/>
          </div>
          <div className="topbarIconContainer">
            <Favorite className="topbarIcon"/>
          </div>
          <div className="topbarIconContainer">
            <PlayCircleFilled className="topbarIcon"/>
          </div>
          <div className="topbarIconContainer">
            <Settings className="topbarIcon"/>
          </div>
        </div>
      </div>
    </div>
  );
}
