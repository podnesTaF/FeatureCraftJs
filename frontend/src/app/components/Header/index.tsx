import { GithubOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Image from "next/image";
import MenuItems from "./components/MenuItems";

const links = [
  {
    id: "1",
    title: "Features",
    expandable: true,
    link: "/features",
  },
  {
    id: "2",
    title: "Contact",
    expandable: false,
    link: "/contact",
  },
  {
    id: "3",
    title: "Log in",
    expandable: false,
    link: "/login",
  },
  {
    id: "4",
    title: "Signup",
    expandable: false,
    link: "/signup",
  },
  {
    id: "5",
    title: <GithubOutlined className="text-2xl" />,
    link: "/",
    expandablr: false,
  },
  {
    id: "6",
    title: "Docs",
    expandable: true,
    link: "/docs",
  },
];

export const Header = () => {
  return (
    <div className="flex justify-between  fixed top-0 left-0 w-full px-3 py-2">
      <div className="flex gap-6 items-center flex-[2]">
        <Image
          height={32}
          width={32}
          className="h-6 w-6 2xl:hidden"
          src={"/logo/logo-short.svg"}
          alt="Logo"
        />
        <Image
          height={32}
          width={400}
          className="h-7 w-auto hidden 2xl:block"
          src={"/logo/logo-inline.svg"}
          alt="Logo"
        />
        <div className="flex-1 max-w-2xl">
          <Input
            size="large"
            placeholder="Search for a Feature"
            variant="filled"
            prefix={<SearchOutlined className="mr-1" twoToneColor="#ccc" />}
            className="w-full !rounded-full !px-4 py-3"
          />
        </div>
      </div>
      <div className="flex-1">
        <MenuItems />
      </div>
    </div>
  );
};
