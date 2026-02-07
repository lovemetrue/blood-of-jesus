/**
 * Маршруты страниц из выпадающего меню (отдельные эндпоинты).
 * Все пункты меню ведут на отдельную страницу, не на главную.
 */
export const MENU_CONTENT_ROUTES = [
  "/love/god",
  "/love/self",
  "/love/neighbor",
  "/faith/promises",
  "/faith/inheritance",
  "/faith/expectations",
  "/covenant/salvation",
  "/covenant/dedication",
  "/covenant/giving",
  "/freedom/rejection",
  "/freedom/church-trauma",
  "/freedom/demonic",
  "/freedom/sin",
  "/freedom/curses",
] as const;

export type MenuContentRoute = (typeof MENU_CONTENT_ROUTES)[number];

export function isMenuContentRoute(pathname: string): pathname is MenuContentRoute {
  return (MENU_CONTENT_ROUTES as readonly string[]).includes(pathname.replace(/\/$/, "") || "/");
}
