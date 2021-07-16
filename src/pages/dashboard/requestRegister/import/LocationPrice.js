import React, { memo, useRef, useState } from "react";
import classes from "./import.module.css";
import {
  Chip,
  Fade,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import tariffSvg from "../../../../styles/svg/link.svg";
import { Link } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import { SearchRounded } from "@material-ui/icons";
import { debounce } from "lodash";
import { searchCargoByTerm } from "../../../../services/dashboard/userInfoServices";

const useStyles = makeStyles({
  root: {
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
});

const LocationPrice = ({ placeClearance, formik, chips, setChips }) => {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [searchCargo, setSearchCargo] = useState([]);

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

  const TariffCodeHandler = (e, value) => {
    delayQuery(e.target.value);
    formik.setFieldValue("tariffCode", value);
  };
  const cargoTitleHandler = (e, value) => {
    delayQuery(e.target.value);
    formik.setFieldValue("cargoTitle", value);
  };

  const searchCargoList =
    !searchCargo || searchCargo.length === 0
      ? [{ id: "", persianCargoDescription: "موردی پیدا نشد" }]
      : searchCargo;

  const addChipsHandler = (e) => {
    const id = e.target.value;
    const text = e.nativeEvent.target[id].text;
    const updateValue = [];
    updateValue.push({
      id,
      name: text,
    });
    setChips((prevState) => [...prevState, ...updateValue]);
  };

  const chipDeleteHandler = (chip) => {
    const updateValue = chips.filter((_, index) => index !== chip);
    setChips([...updateValue]);
  };

  const errorBox = (name, label) => (
    <div className={classes.errorBox}>
      <label htmlFor={name}>{label}</label>
      {formik.touched[name] && formik.errors[name] ? (
        <Fade
          in={formik.touched[name] && formik.errors[name] ? true : false}
          timeout={400}
        >
          <div className={classes.error}>{/* {formik.errors[name]} */}</div>
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
            {errorBox("tariffCode", "کد تعرفه")}
            <Autocomplete
              loading={loading}
              freeSolo
              loadingText="لطفا صبر کنید..."
              disableClearable
              className={`${classes.tariff} ${styles.root} ${
                formik.touched.tariffCode && formik.errors.tariffCode
                  ? classes.inputError
                  : null
              } `}
              onChange={(e, value) =>
                formik.setFieldValue(
                  "tariffCode",
                  value.id
                )
              }
              endadornment={
                <InputAdornment position="end">
                  <SearchRounded />
                </InputAdornment>
              }
              options={searchCargoList}
              getOptionLabel={(option) =>
                option.persianCargoDescription
                  ? option.persianCargoDescription
                  : ""
              }
              renderOption={(option, state) => {
                return option.persianCargoDescription;
              }}
              renderInput={(params) => (
                <TextField
                  className={styles.root}
                  {...params}
                  onChange={(e, value) => TariffCodeHandler(e, value)}
                  placeholder="گوشت حیوانات از نوع گاو، منجمد"
                  margin="none"
                  type="search"
                  variant="outlined"
                  name="tariffCode"
                  onBlur={formik.handleBlur}
                  required
                  InputProps={{
                    ...params.InputProps,
                    type: "tariffCode",
                    endAdornment: <SearchRounded />,
                  }}
                />
              )}
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("cargoTitle", " عنوان کالا ")}
            <Autocomplete
              loading={loading}
              freeSolo
              loadingText="لطفا صبر کنید..."
              disableClearable
              className={`${classes.tariff} ${styles.root} ${
                formik.touched.cargoTitle && formik.errors.cargoTitle
                  ? classes.inputError
                  : null
              } `}
              onChange={(e, value) =>
                formik.setFieldValue(
                  "cargoTitle",
                  value.persianCargoDescription
                )
              }
              endadornment={
                <InputAdornment position="end">
                  <SearchRounded />
                </InputAdornment>
              }
              options={searchCargoList}
              getOptionLabel={(option) =>
                option.persianCargoDescription
                  ? option.persianCargoDescription
                  : ""
              }
              renderOption={(option, state) => {
                return option.persianCargoDescription;
              }}
              renderInput={(params) => (
                <TextField
                  className={styles.root}
                  {...params}
                  onChange={(e, value) => cargoTitleHandler(e, value)}
                  placeholder="گوشت حیوانات از نوع گاو، منجمد"
                  margin="none"
                  type="search"
                  variant="outlined"
                  name="cargoTitle"
                  onBlur={formik.handleBlur}
                  required
                  InputProps={{
                    ...params.InputProps,
                    type: "cargoTitle",
                    endAdornment: <SearchRounded />,
                  }}
                />
              )}
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("portOfLoading", "مبدا کالا ")}
            <input
              className={`${classes.originLoading}  ${
                formik.touched.portOfLoading && formik.errors.portOfLoading
                  ? classes.inputError
                  : null
              } `}
              name="portOfLoading"
              type="text"
              placeholder="بازارچه پرویزخان"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.portOfLoading}
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
            {errorBox("originCustomIds", "گمرک مقصد، محل ترخیص کالا ")}
            <select
              name="originCustomIds"
              value={formik.values.originCustomIds}
              onChange={(e) => addChipsHandler(e)}
              className={`${classes.originReleasingSelect}  ${
                formik.touched.originCustomIds &&
                formik.errors.originCustomIds &&
                formik.values.originCustomIds === "0"
                  ? classes.inputError
                  : null
              } `}
            >
              <option style={{ color: "rgba(0,0,0,0.4)" }}>انتخاب کنید</option>
              {placeClearance.map((option, index) => (
                <option value={option.id} key={index}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.selectedTariffBox}>
            <div className={classes.tariffListTitle}>گمرک های انتخاب شده</div>
            <div className={classes.selectedTariff}>
              {chips.map((item, index) =>
                index !== -1 ? (
                  <Chip
                    className={classes.chip}
                    label={item.name}
                    onDelete={() => chipDeleteHandler(index)}
                    key={item.id}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(LocationPrice);
