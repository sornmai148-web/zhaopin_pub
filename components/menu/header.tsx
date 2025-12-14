import { Container } from "../molecules/container";

import { Logo } from "./logo";
import { LocaleSwitcher } from "../molecules/locale-switcher";
import { HomeButton } from "../molecules/home-button";

export const Header: React.FC<{ locale: Locale }> = () => (
  <div className="shadow-[0px_1px_10px_0px_rgba(0,_0,_0,_0.1)] sticky border-b border-gray-200/70 top-0 z-50 bg-white backdrop-blur-sm">
    <Container className="flex items-center justify-between">
      <div className="flex items-center to-transparent rounded-l-full space-x-2 sm:space-x-3 py-2">
        <Logo />
        <div className="flex flex-col">
          <h3 className="font-bold sm:text-xl text-gray-800">Light Rain</h3>
          <p className="max-sm:text-xs text-sm text-primary-500 font-medium">
            <span className="font-bold">Recruitment </span>
            <span className="text-gray-800"> Agent</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3.5">
        <LocaleSwitcher />
        <HomeButton />
      </div>
    </Container>
  </div>
);
