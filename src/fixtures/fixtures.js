require("dotenv").config();

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export const username = ADMIN_USERNAME;
export const password = ADMIN_PASSWORD;
export const userFullName = "Lišák Admin";
export const applicationsPageSize = 10;
export const applicationsSearchText = "mar";
export const validICO = "22834958";
export const invalidICO = "00000000";

export const ApplicationTexts = {
  loginPage: {
    title: "Přihlášení - Czechitas",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Heslo",
    loginButtonLabel: "Přihlásit",
  },
  applicationsPage: {
    title: "Přihlášky - Czechitas",
    applicationsSectionName: "Přihlášky",
  },
};
