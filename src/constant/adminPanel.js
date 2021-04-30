import { Home, List, Sms, Edit, Person, Payment } from "@material-ui/icons";

export const adminPanelData = {
  logoTitle: "همیار تجارت",
  listItem: [
    {
      text: "داشبورد",
      icon: <Home fontSize="large" style={{ color: "#C4CAD0" }} />,
      path: "/adminPanel/dashboard",
    },
    {
      text: "لیست پیشنهادات",
      icon: <List fontSize="large" style={{ color: "#C4CAD0" }} adminPanel />,
      path: "/adminPanel/suggestionsList",
    },
    {
      text: "تیکت ها",
      icon: <Sms fontSize="large" style={{ color: "#C4CAD0" }} adminPanel />,
      path: "/adminPanel/tickets",
    },
    {
      text: "ثبت درخواست",
      icon: <Edit fontSize="large" style={{ color: "#C4CAD0" }} adminPanel />,
      path: "/adminPanel/requestRegister",
    },
    {
      text: "اطلاعات کاربری",
      icon: <Person fontSize="large" style={{ color: "#C4CAD0" }} adminPanel />,
      path: "/adminPanel/userInfo",
    },
    {
      text: "حساب بانکی",
      icon: (
        <Payment fontSize="large" style={{ color: "#C4CAD0" }} adminPanel />
      ),
      path: "/adminPanel/bankAccount",
    },
  ],

  userInfo: {
    title: "اطلاعات کاربری",
    privateClearanceMan: {
      forms: {
        firstName: "نام",
        lastName: "نام خانوادگی",
        clearanceId: "شماره کارگذاری گمرک",
        mobile: "موبایل",
        address: "آدرس محل کار",
        email: "ایمیل",
      },
    },
  },
};
