export const ROUTES = {
  //-- Default-Routing
  HOME: "/",
  DETAIL: "/detail",
  SERVER_ERROR: "/server-error",

  $RECRUITMENT: function (args: { id: number | string }) {
    return `${this.DETAIL}/${args?.id}`;
  },
} as const;
