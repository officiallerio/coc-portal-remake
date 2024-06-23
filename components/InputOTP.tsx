"use client";

import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

export default function PlusOTP() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 99));
    setNum2(Math.floor(Math.random() * 99));
  }, []);

  return (
    <>
      <div className="flex items-center justify-evenly">
        <Input
          className="w-[50px] text-center focus-visible:ring-primary disabled:opacity-100"
          style={{ cursor: "default" }}
          maxLength={3}
          value={num1 ? num1 : ""}
          disabled
        />
        <p>+</p>
        <Input
          className="w-[50px] text-center focus-visible:ring-primary disabled:opacity-100"
          style={{ cursor: "default" }}
          maxLength={3}
          value={num2 ? num2 : ""}
          disabled
        />
        <p>=</p>
        <Input
          className="w-[50px] text-center focus-visible:ring-primary"
          maxLength={3}
        />
      </div>
    </>
  );
}
