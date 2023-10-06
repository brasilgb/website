'use client'
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { CgSpinnerTwoAlt } from 'react-icons/cg'

const schema = z.object({
    email: z.string()
        .nonempty('O e-mail é obrigatório')
        .email('Formato de e-mail inválido'),
    password: z
        .string()
        .nonempty('A senha é obrigatória')
        .min(6, 'A senha precisa de no mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
    const [errorInLogging, setErrorInLogging] = useState('');
    const [passwordView, setPasswordView] = useState(false);
    const [loadingSignIn, setLoadingSignIn] = useState(false);

    const router = useRouter();
    const { handleSubmit, reset, register, formState: { errors } } = useForm<FormData>({
        mode: "onBlur",
        resolver: zodResolver(schema)
    })

    const handleSignIn = async (data: any) => {
        setLoadingSignIn(true);
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });
        if (signInData?.error) {
            setLoadingSignIn(false)
            setErrorInLogging("E-mail e/ou senha inválidos, tente novamente");
        } else {
            router.push('/admin');
        }
    }

    return (
        <>
            {errorInLogging && <div className="error-message mb-4">{errorInLogging}</div>}

            <form
                className="w-[400] flex flex-col gap-6"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <div className="flex flex-col">
                    <span className="text-base text-gray-500 font-medium">E-mail</span>
                    <input
                        className="h-12 rounded-md p-2 bg-transparent text-base text-gray-600 border border-gray-300"
                        type="text"
                        placeholder="Digite seu e-mail"
                        {...register('email')}
                    />
                    {errors.email?.message &&
                        <div className="text-sm text-red-600">{errors.email?.message}</div>
                    }
                </div>
                <div className="flex flex-col">
                    <span className="text-base text-gray-500 font-medium">Senha</span>
                    <div className="relative flex items-center justify-between">
                        <input
                            className="h-12 rounded-md p-2 bg-transparent text-base text-gray-600 border border-gray-300 w-full"
                            type={passwordView ? 'text' : 'password'}
                            placeholder="Digite sua senha"
                            {...register('password')}
                        />
                        <div
                            className="absolute right-1 cursor-pointer"
                            onClick={() => setPasswordView(!passwordView)}
                        >
                            {passwordView
                                ? <IoEyeOffOutline size={22} color="#4b5563" />
                                : <IoEyeOutline size={22} color="#4b5563" />
                            }
                        </div>
                    </div>

                    {errors.password?.message &&
                        <div className="text-sm text-red-600">{errors.password?.message}</div>
                    }
                </div>
                <button className="btn-login justify-center mt-4" type="submit">
                    {loadingSignIn ? <CgSpinnerTwoAlt size={24} className="animate-spin" /> : 'Entrar'}
                </button>
            </form>
        </>
    )

}

export default SignInForm