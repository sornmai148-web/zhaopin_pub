import { defineRouting } from "next-intl/routing";

/**
 * This link is about how to hide default locale on URL with nextInt
 * @link https://stackoverflow.com/a/79473823
 */
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh-cn"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
});
