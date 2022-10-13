import * as React from "react";
import styles from "./icon.css";
import { Logo, Show } from "../icons";
import { ReactNode } from "react";

type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

export enum EIcons {
  logo = "Logo",
  show = "Show",
}

interface IIconsProps {
  size?: TSizes;
  name: EIcons;
}

function setIconComponent(name: EIcons): ReactNode {
  switch (name) {
    case EIcons.logo:
      return <Logo />;
    case EIcons.show:
      return <Show />;
  }
}

export function Icons(props: IIconsProps) {
  const { size, name } = props;

  return <span>{setIconComponent(name)}</span>;
}
