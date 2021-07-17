import React, { memo, useRef, useState } from "react";
import classes from "./import.module.css";
import {
  Fade,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import tariffSvg from "../../../../styles/svg/link.svg";
import { Link } from "react-router-dom";
import { Autocomplete,  } from "@material-ui/lab";
import { SearchRounded } from "@material-ui/icons";
import { searchCargoByTerm } from "../../../../services/dashboard/userInfoServices";
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiChip-label ": {
      maxWidth: "8.5rem",
    },
    "& .MuiChip-root ": {
      height: "25px",
    },

    flexDirection: "row",
    padding: "0",
    "& .MuiAutocomplete-inputRoot": {
      padding: "0 .5rem",
      outline: "none",
      border: "none",

      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
    },
  },
}));

const LocationPurchase = ({ placeClearancePurchase, formik }) => {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [searchCargo, setSearchCargo] = useState([]);
  const [selectedValueId, setSelectedValueId] = useState("");

  const delayQuery = useRef(
    debounce(
      (q) =>
        searchCargoByTerm(q).then((res) => {
          setSearchCargo(res);
          setLoading(false);
        }),
      500
    )
  ).current;

  const TariffCodePurchaseHandler = (e, value) => {
    delayQuery(e.target.value);
    formik.setFieldValue("tariffCodePurchase", value);
  };

  const autoCompleteHandler = (e, value) => {
    const selectedId = value.map((item) => item.id).toString();
    setSelectedValueId(selectedId);
    formik.setFieldValue("tariffCodePurchase", selectedId);
  };

  const searchCargoList =
    !searchCargo || searchCargo.length === 0
      ? [{ id: "", persianCargoDescription: "موردی پیدا نشد" }]
      : searchCargo;

  const errorBox = (name, label) => (
    <div className={classes.errorBox}>
      <label htmlFor={name}>{label}</label>
      {formik.touched[name] && formik.errors[name] ? (
        <Fade
          in={formik.touched[name] && formik.errors[name] ? true : false}
          timeout={400}
        >
          <div className={classes.error}></div>
        </Fade>
      ) : null}
    </div>
  );

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.fistStpSubTitle}>
        لطفا اطلاعات مربوط به مبدا و مقصد کالای موردنظر خود را وارد کنید
      </Typography>
      <div className={classes.formBox}>
        <div className={classes.inputContainer}>
          <div className={classes.inputBox}>
            {errorBox("tariffCodePurchase", "کد تعرفه")}
            <Autocomplete
              className={`${classes.tariff} ${styles.root} ${
                formik.touched.tariffCodePurchase &&
                formik.errors.tariffCodePurchase
                  ? classes.inputError
                  : null
              } `}
              multiple
              limitTags={1}
              options={searchCargoList}
              getOptionDisabled={() => !!selectedValueId}
              getOptionLabel={(option) =>
                option.persianCargoDescription
                  ? `${option.id} ${option.persianCargoDescription}`
                  : ""
              }
              renderOption={(option) => {
                return option.persianCargoDescription;
              }}
              onChange={(e, value) => autoCompleteHandler(e, value)}
              loading={loading}
              loadingText="لطفا صبر کنید..."
              freeSolo
              disableClearable
              endadornment={
                <InputAdornment position="end">
                  <SearchRounded />
                </InputAdornment>
              }
              renderInput={(params) => (
                <TextField
                  className={styles.root}
                  {...params}
                  onChange={(e, value) => TariffCodePurchaseHandler(e, value)}
                  name="tariffCodePurchase"
                  placeholder={!!selectedValueId ? "" : " 1006 - برنج "}
                  margin="none"
                  type="search"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  required
                  InputProps={{
                    ...params.InputProps,
                    type: "tariffCodePurchase",
                    endAdornment: <SearchRounded />,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("cargoTitlePurchase", " عنوان کالا ")}
            <input
              className={`${classes.originLoading}  ${
                formik.touched.cargoTitlePurchase &&
                formik.errors.cargoTitlePurchase
                  ? classes.inputError
                  : null
              } `}
              name="cargoTitlePurchase"
              type="text"
              placeholder="گوشت حیوانات از نوع گاو، منجمد"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoTitlePurchase}
              required
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("portOfLoadingPurchase", "مبدا کالا ")}
            <input
              className={`${classes.originLoading}  ${
                formik.touched.portOfLoadingPurchase &&
                formik.errors.portOfLoadingPurchase
                  ? classes.inputError
                  : null
              } `}
              name="portOfLoadingPurchase"
              type="text"
              placeholder="بازارچه پرویزخان"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.portOfLoadingPurchase}
              required
            />
          </div>
        </div>
        <div className={classes.tariffCodes}>
          <Link to="/Dashboard/tariffCodesList" target="blank">
            <img src={tariffSvg} alt="tariffCode" />
            <span>لیست کد تعرفه و اولویت های کالاهای گمرکی</span>
          </Link>
        </div>
        <div className={classes.tariffList}>
          <div className={classes.inputBox} style={{ width: "30%" }}>
            {errorBox("originCustomIdsPurchase", "گمرک مقصد، محل ترخیص کالا ")}
            <select
              multiple={false}
              name="originCustomIdsPurchase"
              value={formik.values.originCustomIdsPurchase}
              onChange={formik.handleChange}
              className={`${classes.originReleasingSelect}  ${
                formik.touched.originCustomIdsPurchase &&
                formik.errors.originCustomIdsPurchase &&
                formik.values.originCustomIdsPurchase === "0"
                  ? classes.inputError
                  : null
              } `}
            >
              <option style={{ color: "rgba(0,0,0,0.4)" }}>انتخاب کنید</option>
              {placeClearancePurchase.map((option, index) => (
                <option value={option.id} key={index}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(LocationPurchase);
