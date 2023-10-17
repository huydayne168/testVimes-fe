import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import styles from "./RootLayout.module.css";
const RootLayout = () => {
    return (
        <div className={styles["root"]}>
            <SideBar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
