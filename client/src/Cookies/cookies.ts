import Cookies from "js-cookie";

function addingTime(seconds: number): Date {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);
  return date;
}

export function addCookie(): void {
  const expires = addingTime(15);
  Cookies.set("limitClick", "4", {
    expires,
    path: "/",
    sameSite: "None",
    secure: true,
  });
}
export function remuveCookie(): void {
  Cookies.remove("limitClick", { path: "/" });
}
export function getCookie(): string | undefined {
  const get = Cookies.get("limitClick");
  return get;
}
