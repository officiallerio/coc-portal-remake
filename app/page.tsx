import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import PlusOTP from "@/components/InputOTP";

export default function IndexPage() {
  return (
    <>
      <div className="flex h-screen flex-col gap-4 overflow-y-auto bg-[#155F37] lg:grid lg:grid-cols-2 lg:gap-0">
        <div className="relative h-full">
          <Image
            src="images/ribbon.svg"
            alt="Ribbon"
            height={150}
            width={150}
            className="absolute left-0"
          />
          <div className="flex h-full flex-col items-center gap-[25px] pt-14 lg:justify-center">
            <Image
              src="images/coc-logo.svg"
              alt="COC LOGO"
              height={225}
              width={225}
              className="h-[175px] w-[175px] lg:h-[225px] lg:w-[225px]"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-2xl font-semibold text-white md:text-4xl">
                Cagayan De Oro College
              </h1>
              <h3 className="text-center text-sm font-thin text-white lg:text-lg">
                Max Suniel St. Carmen, Cagayan de Oro City, Misamis Oriental,
                Philippines 9000
              </h3>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-[30px] rounded-t-[50px] bg-white p-10 lg:rounded-l-[50px] lg:rounded-t-[0px] lg:rounded-tl-[50px]">
          <Image
            src="images/phinma-logo.svg"
            alt="PHINMA LOGO"
            height={410}
            width={410}
          />
          <div className="flex w-full flex-col items-center justify-center gap-8 lg:w-[410px]">
            <h3 className="text-xl font-semibold">Login to your Account</h3>
            <div className="flex w-full flex-col gap-4">
              <div className="space-y-1">
                <Label>Student ID</Label>
                <Input className="focus-visible:ring-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="space-y-1">
                  <Label>Password</Label>
                  <Input
                    className="focus-visible:ring-primary"
                    type="password"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-none text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Forgot Password?
                  </p>
                </div>
              </div>
              <PlusOTP />
            </div>
            <Button className="h-10 w-full">Login</Button>
          </div>
        </div>
      </div>
    </>
  );
}
