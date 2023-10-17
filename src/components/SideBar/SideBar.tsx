import React from "react";
import styles from "./SideBar.module.css";

import {
    CalendarOutlined,
    FormOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    type MenuItem = Required<MenuProps>["items"][number];

    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem("Form", "", <FormOutlined />),
        getItem("List", "list", <UnorderedListOutlined />),
    ];
    const navigate = useNavigate();
    const onClickNavItem: MenuProps["onClick"] = (e) => {
        console.log("click ", e.key);

        navigate(`${e.key}`);
    };
    return (
        <Menu
            onClick={onClickNavItem}
            style={{ width: 256, padding: "24px 12px" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={items}
        />
    );
};

export default SideBar;
