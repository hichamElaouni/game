import { NavLink } from "react-router-dom";
import { FaBars, FaGamepad, FaHome, FaLock, FaMoneyBill, FaUser, FaRegQuestionCircle, FaLaravel } from "react-icons/fa";
import { MdMessage, MdDeck, MdSubject } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { hasLoggedOut, getUser } from "../service/auth"

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/ListUsers",
    name: "Users",
    icon: <FaUser />,
  },
  // {
  //   path: "/messages",
  //   name: "Messages",
  //   icon: <MdMessage />,
  // },
  {
    path: "/Questions",
    name: "Questions",
    icon: <FaRegQuestionCircle />,
  },

  {
    path: "/rooms",
    name: "Rooms",
    icon: <MdDeck />,
  },

  {
    path: "/subjects",
    name: "Subjucts",
    icon: <MdSubject />,
  }, {
    path: "/levels",
    name: "Levels",
    icon: <FaLaravel />,
  },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  // exact: true,
  // subRoutes: [
  //   {
  //     path: "/settings/game",
  //     name: "Game",
  //     icon: <FaGamepad />,
  //   },
  //   {
  //     path: "/settings/Question",
  //     name: "",
  //     icon: <FaLock />,
  //   },
  //   {
  //     path: "/settings/billing",
  //     name: "Billing",
  //     icon: <FaMoneyBill />,
  //   },
  // ],
  // },
  {
    path: "/SetingsCusm",
    name: "SetingsCusm",
    icon: <AiFillHeart />,
  },
];

//getUser

const SideBar = (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { user } = getUser()
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };


  return (
    <>

      <div className="main-container">

        <motion.div
          animate={{
            width: isOpen ? "12rem" : "2rem",
            zIndex: 10,
            position: "fixed",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                  style={{ cursor: "pointer" }}
                  title="Log Out"
                  onClick={hasLoggedOut}

                >
                  {/* <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundSize: "contain",
                      backgroundPosition: "centre",
                      backgroundImage: `url(${Image})`,
                      color: "#fff0",
                      float: "right",
                    }}
                  >
                    .
                  </Avatar>{" "} */}
                  {user.first_name + " " + user.last_name}


                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <Fragment key={index}>
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  </Fragment>
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>

    </>
  );
};

export default SideBar;
