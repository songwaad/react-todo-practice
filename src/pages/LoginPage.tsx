import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";

import "../App.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

//สร้าง Schema สำหรับ validate account
const loginFormSchema = z.object({
  username: z.string().min(1, "This field is required."),
  password: z.string().min(1, "This field is required."),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<{ username: string; password: string }>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
    defaultValues: {
      username: "json",
      password: "password",
    },
  });

  const onSubmit: SubmitHandler<{ username: string; password: string }> = async (data) => {
    setIsLoading(true);

    const result = await login(data.username, data.password);
    if (result.success) {
      navigate("/");
    } else {
      alert(`Login failed: ${result.error}`);
    }
    setIsLoading(false);
  }

  const img =
    "https://images.unsplash.com/photo-1552083974-186346191183?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-[6]">
          <img className="h-full" src={img} alt="image" />
        </div>

        <div className="flex-[4]">
          <div className="flex h-full items-center">

            {/* FORM */}
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="flex flex-col m-auto w-full items-center "
              >
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <div className="grid w-full max-w-sm items-center gap-3 pb-4">
                      <FormLabel> Username </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          type="text" 
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField 
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <div className="grid w-full max-w-sm items-center gap-3 pb-4">
                      <FormLabel> Password </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            id="password"
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:opacity-80 cursor-pointer"
                          >
                          {showPassword ? (
                            <EyeOffIcon size={18} strokeWidth={0.7} />
                          ) : (
                            <EyeIcon size={18} strokeWidth={0.7} />
                          )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />

                <div className="grid w-full max-w-sm items-center gap-3 pt-4">
                  <Button type="submit" className="cursor-pointer w-full">
                    {isLoading ? (
                      <>
                        <Spinner /> Loading...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>

                <div className="grid w-full max-w-sm items-center text-center gap-3 pt-4">
                  <p className="text-sm">
                    Don't Have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </Form>

          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
