import {
  Home,
  List,
  Sms,
  Edit,
  Person,
  Payment,
  PageviewRounded,
} from "@material-ui/icons";

export const adminPanelData = {
  logoTitle: "همیار تجارت",
  listItem: [
    {
      text: "داشبورد",
      icon: <Home fontSize="large" style={{ color: "#C4CAD0" }} />,
      path: "/Dashboard/main",
      hasDropDown: false,
    },
    {
      text: "لیست درخواست ها",
      icon: <List fontSize="large" style={{ color: "#C4CAD0" }} dashboard />,
      path: "/Dashboard/suggestionsList",
      dropDownText: [
        {
          text: "ترخیص کالا",
          path: "/Dashboard/suggestionsList/clearanceRequestsList",
        },
        {
          text: "استعلام قیمت",
          path: "/Dashboard/suggestionsList/quotationRequestList",
        },
      ],
      hasDropDown: true,
    },
    {
      text: "تیکت ها",
      icon: <Sms fontSize="large" style={{ color: "#C4CAD0" }} dashboard />,
      path: "/Dashboard/tickets",
      hasDropDown: false,
    },
    {
      text: "ثبت درخواست",
      icon: <Edit fontSize="large" style={{ color: "#C4CAD0" }} dashboard />,
      path: "/Dashboard/requestRegister",
      hasDropDown: false,
    },
    {
      text: "اطلاعات کاربری",
      icon: <Person fontSize="large" style={{ color: "#C4CAD0" }} dashboard />,
      path: "/Dashboard/userInfo",
      dropDownText: [
        {
          text: "حقیقی",
          path: "/Dashboard/userInfo/Private",
        },
        {
          text: "حقوقی",
          path: "/Dashboard/userInfo/Juridical ",
        },
      ],
      hasDropDown: true,
    },
    {
      text: "حساب بانکی",
      icon: <Payment fontSize="large" style={{ color: "#C4CAD0" }} dashboard />,
      path: "/Dashboard/bankAccount",
      hasDropDown: false,
    },
    {
      text: "لیست کد تعرفه کالا",
      icon: (
        <PageviewRounded
          fontSize="large"
          style={{ color: "#C4CAD0" }}
          dashboard
        />
      ),
      path: "/Dashboard/tariffCodesList",
      hasDropDown: false,
    },
  ],

  listItemClearance: [
    {
      text: "لیست پیشنهاد ها",
      icon: <List fontSize="large" style={{ color: "#C4CAD0" }} dashboard />,
      path: "/Dashboard/quotationProposalsListAsync",
      dropDownText: [
        {
          text: "ترخیص کالا",
          path: "/Dashboard/quotationProposalsListAsync/clearance",
        },
        {
          text: "استعلام قیمت",
          path: "/Dashboard/quotationProposalsListAsync/quotationRequestList",
        },
      ],
      hasDropDown: true,
    },
    {
      text: "لیست درخواست ها",
      icon: <List fontSize="large" style={{ color: "#C4CAD0" }} dashboard />,
      path: "/Dashboard/RequestList",
      dropDownText: [
        {
          text: "ترخیص کالا",
          path: "/Dashboard/RequestList/SearchAllClearanceRequests",
        },
        {
          text: "استعلام قیمت",
          path: "/Dashboard/RequestList/SearchAllQuotationRequests",
        },
      ],
      hasDropDown: true,
    },
  ],

  userInfo: {
    title: "اطلاعات کاربری",
    clearanceMan: {
      forms: {
        companyName: "نام شرکت",
        companyNationalId: "شناسه ملی شرکت",
        nationalId: "شماره ملی",
        firstName: "نام",
        lastName: "نام خانوادگی",
        clearanceId: "شماره کارگزاری گمرک",
        mobile: "شماره تلفن همراه  ",
        address: "آدرس محل کار",
        email: "ایمیل",
        clearances: "گمرک های انتخاب شده",
        criminalRecordImg: "پیش نمایش (سایز فایل حداکثر 2 مگابایت)",
        WorkExperienceImg: "پیش نمایش (سایز فایل حداکثر 2 مگابایت)",
        selectClearance: "آمادگی ترخیص کالا در گمرک های",
        criminalRecordUpload: "بارگذاری گواهی عدم سوء پیشینه",
        WorkExperienceUpload: "بارگذاری سوابق کار قبلی",
        upload: "انتخاب تصویر",
        options: [
          { value: "0", label: "انتخاب گمرک" },
          { value: "منطقه آزاد کیش", label: "منطقه آزاد کیش" },
          { value: "منطقه آزاد قشم", label: "منطقه آزاد قشم" },
          { value: "منطقه آزاد نوشهر", label: "منطقه آزاد نوشهر" },
        ],
      },
      placeHolder: {
        companyName: "شرکت ترخیص همراه سپاهان ایرانیان",
        firstName: "علی",
        lastName: "محمدی",
        companyNationalId: "_ _ _ _ _ _ _ _ _ _ _",
        nationalId: "_ _ _ _ _ _ _ _ _ _",
        clearanceId: "_ _ _ _ _ _ _ _ _ _ _",
        mobile: "_ _ _ _ _ _ _ _ _ _ _",
        address: "خیابان فاطمی، خیابان جهان آرا، ساختمان شقایق، واحد 5",
        email: "example@gmail.com",
      },
      error: {
        companyName: "نام شرکت را وارد کنید",
        wrongNumber: "شماره صحیح نیست",
        companyNationalId: " شناسه را وارد کنید",
        nationalIdWrong: "شماره ملی صحیح نیست",
        nationalId: "شماره ملی را وارد کنید",
        clearanceId: " کارگزاری را وارد کنید",
        firstName: "نام  را وارد کنید",
        lastName: " نام خانوادگی را وارد کنید",
        mobileWrong: "شماره صحیح نیست",
        mobile: "شماره همراه وارد کنید",
        address: "آدرس  را وارد کنید",
        emailWrong: "ایمیل صحیح نیست",
        email: "ایمیل را وارد کنید",
        selectClearance: "گمرک مورد نظر خود را وارد کنید",
      },
    },
  },
  requestRegister: {
    title: "ثبت درخواست",
  },
};
