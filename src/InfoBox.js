import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, isOrange, ...props }) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isOrange && "infoBox--orange"} ${isRed && "infoBox--red"}`}>
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* No. of Cases */}
        <h2 className={`infoBox__cases ${!isRed && !isOrange && "infoBox__cases--green"}`}>{cases}</h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
