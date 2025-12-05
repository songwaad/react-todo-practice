import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router";
import { apiRegister } from "@/api/auth";

import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";

import "../App.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

//สร้าง Schema สำหรับ validate account
const signUpFormSchema = z.object({
  username: z.string()
    .regex(/^[A-Za-z]/, "Username must start with a letter (A-Z or a-z).")
    .min(3, "Username must be at least 3 characters long."),
  password: z.string()
    .min(6, "Password must be at least 6 characters long."),
  confirmPassword: z.string()
    .min(6, "Password must be at least 6 characters long."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

function SignUpPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerForm = useForm<{ username: string; password: string; confirmPassword: string }>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
    defaultValues: {
      username: "username",
      password: "password",
      confirmPassword: "password",
    }
  });
  const onSubmit: SubmitHandler<{ username: string; password: string }> = async (
    data
  ) => {
    setIsLoading(true);

    const res = await apiRegister(data.username, data.password);
    if (res.ok) {
      navigate("/login");
    } else {
      alert(`Registration failed: ${res.error}`);
    }

    setIsLoading(false);
  };

  return (
    <>

        <div className="flex items-center justify-center h-screen">
          <div className="flex w-lg py-14 border rounded-3xl items-center">

            {/* FORM */}
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onSubmit)}
                className="flex flex-col m-auto w-full items-center "
              >
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <div className="grid w-full max-w-sm items-center gap-3 pb-4">
                      <FormLabel> Username </FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField 
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <div className="grid w-full max-w-sm items-center gap-3 pb-4">
                      <FormLabel> Password </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:opacity-80"
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

                <FormField 
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <div className="grid w-full max-w-sm items-center gap-3 pb-4">
                      <FormLabel> Confirm Password </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" {...field} />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:opacity-80"
                          >
                          {showConfirmPassword ? (
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
                      "Sign Up"
                    )}
                  </Button>
                </div>

                <div className="grid w-full max-w-sm items-center text-center gap-3 pt-4">
                  <p className="text-sm">
                    Have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </Form>

          </div>
        </div>
    </>
  );
}

export default SignUpPage;
