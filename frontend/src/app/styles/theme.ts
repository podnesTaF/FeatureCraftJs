import { ThemeConfig } from "antd";

export const antTheme: ThemeConfig = {
  token: {
    colorPrimaryBorder: "#f3f4f6",
  },
  components: {
    Menu: {
      activeBarBorderWidth: 10,
      horizontalItemHoverBg: "#f3f4f6",
      horizontalItemBorderRadius: 999,
      horizontalItemHoverColor: "transparent",
    },
  },
};
