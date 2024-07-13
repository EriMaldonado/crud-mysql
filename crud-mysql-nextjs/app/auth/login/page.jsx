"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
            {error}
          </p>
        )}
        <h1 className="text-gray-900 font-bold text-2xl mb-4 text-center">
          Inicio de Sesión
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700 text-md mb-2 block">
            Correo:
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Correo es requeirdo",
              },
            })}
            className="p-3 rounded block w-full bg-gray-200 text-gray-900"
            placeholder="user@email.com"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-gray-700 text-md mb-2 block"
          >
            Contraseña:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña es requerida",
                },
              })}
              className="p-3 rounded block w-full bg-gray-200 text-gray-900 pr-10"
              placeholder="contraseña"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
          Iniciar
        </button>
        <p className="text-center mt-4">
          No tienes una cuenta?{" "}
          <Link href="/auth/register" className="text-blue-500 underline">
            Registrarse
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
  );
}

export default LoginPage;
