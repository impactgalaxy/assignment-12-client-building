import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import defaultUser from "../../../assets/user.png";
import logo from "../../../assets/logo.png";
import { Flex, Text } from "@chakra-ui/react";
import useAuth from "../../../others/hooks/useAuth";
import toast from "react-hot-toast";
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "myProfile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    path: "editProfile",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    path: "inbox",
  },
  {
    label: "Dashboard",
    icon: LifebuoyIcon,
    path: "dashboard",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    path: "/",
  },
];

function ProfileMenu() {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const handleRoute = (label) => {
    switch (label) {
      case "My Profile": {
        break;
      }
      case "Edit Profile": {
        break;
      }
      case "Inbox": {
        break;
      }
      case "Dashboard": {
        <Link to="/dashboard"></Link>;
        break;
      }
      case "Sign Out": {
        logOut()
          .then(() => {
            toast.success("Logout successful");
          })
          .catch((error) => {
            let errMsg = error.code.split("/")[1];
            toast.error(errMsg);
          });
        break;
      }
    }
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={user?.photoURL ? user?.photoURL : defaultUser}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-3">
        <MenuItem>
          <p className="text-center py-4 ">{user?.displayName}</p>
        </MenuItem>
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu();
                handleRoute(label);
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}>
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Link to={path}>
                <Typography
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}>
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: UserCircleIcon,
    link: "/",
  },
  {
    label: "Apartment",
    icon: CubeTransparentIcon,
    link: "/apartments",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 md:flex-row md:items-center">
      {navListItems.map(({ label, icon, link }) => (
        <Typography
          key={label}
          variant="small"
          className="font-medium text-blue-gray-500">
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <NavLink
              to={link}
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                  viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}>
              {" "}
              {label}
            </NavLink>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export function ComplexNavbar() {
  const { user } = useAuth();

  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Flex alignItems="center" gap="12px" justifyContent="center">
          <img
            src={logo}
            alt=""
            className="h-10 w-10 object-cover block m-auto"
          />
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="2xl"
            textAlign="center"
            fontWeight="extrabold">
            Build Nest
          </Text>
        </Flex>
        <div className="hidden md:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 md:hidden">
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <div>
          {!user ? (
            <Button size="sm" variant="text">
              <Link to="/login">Log In</Link>
            </Button>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
