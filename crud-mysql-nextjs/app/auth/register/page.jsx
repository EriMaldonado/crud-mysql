"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("La contraseñas no coinciden");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      await res.json();

      router.push("/auth/login");
    } catch (error) {
      alert("Registration failed. Please try again later.");
      console.error("Registration error:", error);
    }
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          action=""
          onSubmit={onSubmit}
          className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-gray-900 font-bold text-2xl text-center pb-4">
            Registro de Usuario
          </h1>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="text-gray-700 text-md mb-1 block"
            >
              Nombre de Usuario:
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Nombre de usuario es requerido",
              })}
              className="p-3 rounded block w-full bg-gray-200 text-gray-900"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="text-gray-700 text-md mb-1 block">
              Correo:
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Correo es requerido",
              })}
              className="p-3 rounded block w-full bg-gray-200 text-gray-900"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="relative mb-2">
            <label
              htmlFor="password"
              className="text-gray-700 text-md mb-1 block"
            >
              Contraseña:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Contraseña es requerida",
              })}
              className="p-3 rounded block w-full bg-gray-200 text-gray-900 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 py-2 mt-8 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 text-md mb-1 block"
            >
              Repetir Contraseña:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirmar contraseña",
              })}
              className="p-3 rounded block w-full bg-gray-200 text-gray-900 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 mt-8 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            Registrarse
          </button>
          <p className="text-center mt-4">
            Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-blue-600 underline">
              Inicia Sesión
            </Link>
          </p>
        </form>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <button className="p-2 bg-green-600 hover:bg-green-900 text-white rounded-lg">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
