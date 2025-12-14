"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const FilterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="icon"
      >
        <SlidersHorizontal />
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none md:hidden"
        onClose={() => setIsOpen(false)}
        __demoMode
      >
        <div className="fixed w-screen inset-0 !z-50 overflow-y-auto">
          <div className="flex items-center justify-center">
            <DialogPanel
              transition
              className="w-full relative pt-20 h-[100dvh] bg-gray-100 px-6 pb-8 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="flex flex-col space-y-2">Modal</div>

              {/*-- Close Button --*/}
              <button
                className="cursor-pointer absolute top-8 right-6 p-1 bg-orange-400/10 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <X className="text-amber-500 size-5" />
              </button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
