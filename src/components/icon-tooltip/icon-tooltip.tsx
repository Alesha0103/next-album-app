import React from "react";
import styles from "./icon-tooltip.module.scss";

import { Tooltip } from "react-tooltip";
import classNames from "classnames";

const ICON_TOOLTIP_ID = "icon-tooltip-id"

interface IconTooltipProps {
  content: string;
  error?: boolean
}

export const IconTooltip: React.FC<IconTooltipProps> = ({ content, error }) => {
  if (!content) {
    return null;
  }

  return (
    <>
      <span
        className={classNames(styles.icon, {[styles.error]: error})}
        data-tooltip-id={ICON_TOOLTIP_ID}
        data-tooltip-content={content}
        data-tooltip-place="bottom"
        
      >i</span>
      <Tooltip id={ICON_TOOLTIP_ID} style={{ zIndex: 9999 }}/>
    </>
  )
}
