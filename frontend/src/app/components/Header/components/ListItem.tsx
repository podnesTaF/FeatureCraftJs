"use client";
import { DownOutlined, LockOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ListItemProps {
  title: any;
  expandable?: boolean;
  expandableItems?: any[];
  link: string;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className="flex gap-2 hover:bg-gray-100 rounded-md w-1/2">
        <LockOutlined className="text-3xl" />
        <div className="flex flex-col gap-3">
          <p>1st menu item</p>
          <p className="text-sm text-gray-500">Description</p>
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const ListItem = ({
  title,
  expandable,
  link,
  expandableItems,
}: ListItemProps): JSX.Element => {
  const pathname = usePathname();
  return expandable ? (
    <Dropdown
      rootClassName="flex w-full max-w-md flex-wrap py-2"
      menu={{ items: items }}
      placement="bottomLeft"
      overlayClassName={"flex w-full max-w-md flex-wrap py-2"}
    >
      <div
        className={
          "bg-transparent hover:bg-gray-100 text-gray-700 rounded-full py-2 px-3 flex items-center gap-2 cursor-pointer"
        }
      >
        <p>{title}</p>
        <DownOutlined className="w-4 h-2" />
      </div>
    </Dropdown>
  ) : (
    <div
      className={
        "bg-transparent hover:bg-gray-100 text-gray-700 rounded-full py-2 px-3 flex items-center gap-2"
      }
    >
      <Link href={link}>{title}</Link>
    </div>
  );
};

export default ListItem;
