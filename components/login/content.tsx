"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { leftContainerVariants } from "@/lib/utils";
import { loginSchema } from "@/lib/schema";
import { login } from "@/lib/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { MotionDiv } from "@/components/motionDiv";
import FormStateMessage from "../formStateMessage";

export default function LoginContent() {
  const router = useRouter();
  const [formState, setFormState] = useState({ message: "", type: "" });
  const [isPending, setIsPending] = useTransition();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const generateNewNumbers = () => {
    setNum1(Math.floor(Math.random() * 99));
    setNum2(Math.floor(Math.random() * 99));
  };

  useEffect(() => {
    generateNewNumbers();
  }, []);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
  });

  const handleAnswerChange = (e: any) => {
    const value = e.target.value;
    setUserAnswer(value);

    const correctAnswer = num1 + num2;
    if (value === "") {
      setIsWrong(false);
      setIsCorrect(false);
    } else if (parseInt(value) === correctAnswer) {
      setIsWrong(false);
      setIsCorrect(true);
    } else {
      setIsWrong(true);
      setIsCorrect(false);
    }
  };

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) !== correctAnswer) {
      setFormState({
        message: "Incorrect sum. Please try again.",
        type: "error",
      });
      setIsCorrect(false);
      setIsWrong(false);

      generateNewNumbers();
      setUserAnswer("");
      return;
    }

    setIsPending(() => {
      login(values).then((data) => {
        if (data) {
          setFormState({
            message: data.error ?? "An error occurred",
            type: "error",
          });
          setIsCorrect(false);
          setIsWrong(false);
          form.setValue("password", "");
        } else {
          setFormState({
            message: "Successfully logged in.",
            type: "success",
          });
          setTimeout(() => {
            router.replace("/dashboard");
          }, 500); // 1500 milliseconds = 1.5 seconds
        }
      });

      generateNewNumbers();
      setUserAnswer("");
    });
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-0">
      <div className="relative flex h-full flex-col">
        <Image
          src="images/ribbon.svg"
          alt="Ribbon"
          height={150}
          width={150}
          className="absolute left-0"
        />
        <MotionDiv
          variants={leftContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex h-full flex-col items-center gap-[25px] pt-14 lg:justify-center"
        >
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
        </MotionDiv>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[30px] rounded-t-[50px] bg-white p-10 lg:rounded-l-[50px] lg:rounded-t-[0px] lg:rounded-tl-[50px]">
        <MotionDiv
          variants={leftContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2"
        >
          <Image
            src="images/phinma-logo.svg"
            alt="PHINMA LOGO"
            height={410}
            width={410}
          />
          <div className="flex w-full flex-col items-center justify-center gap-8 lg:w-[410px]">
            <h3 className="text-xl font-semibold">Login to your Account</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4"
              >
                <FormStateMessage
                  message={formState.message}
                  type={formState.type}
                />
                <div className="flex w-full flex-col gap-4">
                  <div className="space-y-1">
                    <FormField
                      control={form.control}
                      name="studentId"
                      render={({ field }) => (
                        <FormItem className="grid gap-1">
                          <FormLabel htmlFor="studentId">Student ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="studentId"
                              type="studentId"
                              placeholder="Student ID"
                              className={`text-[15px] ${
                                form.control._formState.errors.studentId
                                  ? "border-destructive focus:border-0"
                                  : ""
                              } bg-white focus-visible:ring-primary`}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-1">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="password"
                                type="password"
                                placeholder="**********"
                                className={`text-[15px] ${
                                  form.control._formState.errors.password
                                    ? "border-destructive focus:border-0"
                                    : ""
                                } bg-white focus-visible:ring-primary`}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
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
                      className={`${isWrong ? "border-destructive focus-visible:ring-0" : ""} ${isCorrect ? "border-primary focus-visible:ring-0" : ""} w-[50px] text-center focus-visible:ring-primary`}
                      maxLength={3}
                      value={userAnswer}
                      onChange={handleAnswerChange}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-10 w-full"
                >
                  {isPending ? "Loading..." : "Login"}
                </Button>
              </form>
            </Form>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
