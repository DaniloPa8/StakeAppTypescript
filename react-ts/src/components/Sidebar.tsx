import classes from "./../styles/Sidebar.module.css";

import menu from "./../images/menu.svg";
import token from "./../images/token.svg";
import manual from "./../images/book.svg";
import info from "./../images/info.svg";
import logout from "./../images/logout.svg";
import owner from "./../images/owner.svg";

type SidebarProps = {
  menuHandler: () => void;
  ownerHandler: () => void;
  tokenHandler: () => void;
  aboutHandler: () => void;
  manualHandler: () => void;
  menuOpen: boolean;
  isOwner: boolean;
};

const Sidebar = ({
  menuHandler,
  ownerHandler,
  tokenHandler,
  aboutHandler,
  manualHandler,
  menuOpen,
  isOwner,
}: SidebarProps) => {
  return (
    <>
      <div
        className={
          menuOpen ? classes.sidebar_menu_cont_open : classes.sidebar_menu_cont
        }
      >
        <img
          alt="menu"
          src={menu}
          className={classes.sidebar_menu}
          onClick={menuHandler}
        />
        <p className={classes.menu_txt}> Menu </p>
      </div>
      <div
        className={`${classes.sidebar} ${classes.animate_fade} ${
          menuOpen ? classes.menu_open_mobile : ""
        }`}
      >
        {menuOpen && (
          <div className={classes.sidebar_menu_close} onClick={menuHandler}>
            <p>Close Menu</p>
          </div>
        )}
        <div className={classes.sidebar_comp}>
          <p>StakeAppⒸ</p>
        </div>
        <div
          className={classes.sidebar_token}
          onClick={isOwner ? ownerHandler : tokenHandler}
        >
          {isOwner && (
            <img
              alt="owner"
              src={owner}
              className={classes.sidebar_token_img}
            />
          )}
          {!isOwner && (
            <img
              alt="token"
              src={token}
              className={classes.sidebar_token_img}
            />
          )}
        </div>
        <div className={classes.sidebar_manual} onClick={manualHandler}>
          <img
            alt="manual"
            src={manual}
            className={classes.sidebar_manual_img}
          />
        </div>
        <div className={classes.sidebar_aboutUs} onClick={aboutHandler}>
          <img alt="aboutUs" src={info} className={classes.sidebar_info_img} />
        </div>
        <div className={classes.sidebar_logout}>
          <img
            alt="logout"
            src={logout}
            className={classes.sidebar_logout_img}
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
