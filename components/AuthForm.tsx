"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

export default function AuthForm({ type }: { type: string }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap:8">
        <Link href="/" className="cursor-pointer items-center flex gap-1 ">
          <Image src="/icons/logo.svg" width={34} height={34} alt="bank-app" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Next-Bank
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className=" text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className=" flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <CustomInput
                        control={form.control}
                        label="First Name"
                        name="firstName"
                        placeholder="Please provide your First Name"
                      />
                    </div>
                    <div className="w-full">
                      <CustomInput
                        control={form.control}
                        label="Last Name"
                        name="lastName"
                        placeholder="Please provide your Last Name"
                      />
                    </div>
                  </div>

                  <CustomInput
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Please provide your address"
                  />
                  <CustomInput
                    control={form.control}
                    label="City"
                    name="city"
                    placeholder="Please provide your city"
                  />
                  <div className="flex gap-4">
                    <div className="w-full">
                      <CustomInput
                        control={form.control}
                        label="State"
                        name="state"
                        placeholder="Example: VIC"
                      />
                    </div>
                    <div className="w-full">
                      <CustomInput
                        control={form.control}
                        label="Postal Code"
                        name="postalCode"
                        placeholder="Example: 3280"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 ">
                    <div className="w-full">
                      <CustomInput
                        control={form.control}
                        label="DOB"
                        name="dateOfBirth"
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                    <div className="w-full">
                      <CustomInput
                        control={form.control}
                        label="SSN"
                        name="ssn"
                        placeholder="Example:4329"
                      />
                    </div>
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label="E-mail"
                name="email"
                placeholder="Please provide your Email"
              />
              <CustomInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Please provide your Password"
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account? "}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}
