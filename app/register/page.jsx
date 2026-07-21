"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/api/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
const router =useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Minimum 3 characters";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked")

    if (!validate()) return;

    console.log(form);

    try {
      const data = await createUser(form);
      console.log(data);
      // alert("User Registered Successfully");
      toast.success("User Registered Successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      router.push("/expenseForm");
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>

          <p className="text-gray-500 text-center mt-2 mb-8">Expense Tracker</p>

          <form  onSubmit={handleSubmit}className="space-y-5">
            <div>
              <Label className="text-lg">Name</Label>

              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Samuel"
                className="h-11 pl-10"
              />

              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            </div>

            <div>
              <Label className="text-lg">Email</Label>

              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="samuel@gmail.com"
                className="h-11 pl-10"
              />

              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            </div>

            <div>
              <Label className="text-lg">Phone Number</Label>

              <Input
                name="phone"
                value={form.phone}
                maxLength={10}
                pattern="[0-9]{10}"
                onChange={handleChange}
                placeholder="9876543210"
                className="h-11 pl-10"
              />

              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            </div>

            <div>
              <Label className="text-lg">Password</Label>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="pr-12 h-11 pl-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            </div>

            <Button className="w-full p-5 text-lg" type="submit " >Register</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
