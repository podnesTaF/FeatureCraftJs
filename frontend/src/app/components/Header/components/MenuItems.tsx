import { Menu, MenuProps } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    label: (
      <div
        className={
          "bg-transparent hover:bg-gray-100 text-gray-700 rounded-full py-2 px-3 flex items-center gap-2"
        }
      >
        <Link href={"/features"}>Features</Link>
      </div>
    ),
    key: "features",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    label: (
      <div
        className={
          "bg-transparent hover:bg-gray-100 text-gray-700 rounded-full py-2 px-3 flex items-center gap-2"
        }
      >
        <Link href={"/contact"}>Contact</Link>
      </div>
    ),
    key: "contact",
  },
  {
    label: (
      <div
        className={
          "bg-transparent hover:bg-gray-100 text-gray-700 rounded-full py-2 px-3 flex items-center gap-2"
        }
      >
        <Link href={"/login"}>Log in</Link>
      </div>
    ),
    key: "login",
  },
  {
    label: (
      <div
        className={
          "bg-transparent hover:bg-gray-100 text-gray-700 rounded-full py-2 px-3 flex items-center gap-2"
        }
      >
        <Link href={"/signup"}>Signup</Link>
      </div>
    ),
    key: "signup",
  },
];

const MenuItems = () => {
  return (
    <Menu
      className="w-auto border-none bg-transparent"
      style={{ border: "none" }}
      mode={"horizontal"}
      rootClassName="bg-black"
      items={items}
    ></Menu>
  );
};

export default MenuItems;
