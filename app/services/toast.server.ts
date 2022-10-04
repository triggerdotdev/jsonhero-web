import { createCookieSessionStorage, Session } from "remix";

export type ToastMessage = {
  message: string;
  title: string;
  type: "success" | "error";
  id: string;
};

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

export const { commitSession, getSession } = createCookieSessionStorage({
  cookie: {
    name: "__message",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: ONE_YEAR,
    secrets: [SESSION_SECRET],
    secure: true,
  },
});

export function setSuccessMessage(
  session: Session,
  message: string,
  title: string
) {
  session.flash("toastMessage", {
    message,
    title,
    type: "success",
    id: crypto.randomUUID(),
  });
}

export function setErrorMessage(
  session: Session,
  message: string,
  title: string
) {
  session.flash("toastMessage", {
    message,
    title,
    type: "error",
    id: crypto.randomUUID(),
  });
}
