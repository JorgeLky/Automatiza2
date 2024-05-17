import { useState } from "react";

import Link from "next/link";

import MuiCloseIcon from "@mui/icons-material/Close";
import MuiArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Error } from "@/presentation";

import { menu } from "./data";

import * as S from "./styles";

export function SideBar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Error name="side-bar">
      <S.Sidebar>
        <button
          type="button"
          className="block-bar"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <MuiArrowForwardIosIcon fontSize="small" />
          ) : (
            <MuiCloseIcon fontSize="small" />
          )}
        </button>

        <div
          className="menu-list"
          id="side-bar-menu"
          style={{ width: collapsed ? "47px" : "250px" }}
        >
          {menu.map((m) => {
            return (
              <Link key={m.text} passHref href={m.url}>
                <a href="">
                  {m.icon}

                  {m.text}
                </a>
              </Link>
            );
          })}
        </div>
      </S.Sidebar>
    </Error>
  );
}
