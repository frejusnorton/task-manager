import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError } from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { registerUser } from "../../services/authService";
import Seo from "../../components/Seo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup.object().shape({
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().min(6, "Le mot de passe doit avoir au moins 6 caractères").required("Le mot de passe est requis"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Veuillez confirmer le mot de passe"),
});

interface FormData {
    email: string;
    password: string;
    password_confirmation: string;
}

const Inscription: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showpassword_confirmation, setShowpassword_confirmation] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const onSubmit = async (formData: FormData) => {
        try {
            setSuccessMessage(null);
            const response = await registerUser(formData);

            toast.success("Inscription réussie !");
            console.log("Inscription réussie :", response);
            setTimeout(() => {
                navigate('/connexion');
            }, 2000);

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Une erreur est survenue.";
                toast.error(errorMessage);
                setError("email", { type: "server", message: errorMessage });
            } else {
                toast.error("Une erreur inconnue est survenue.");
                setError("email", { type: "server", message: "Une erreur inconnue est survenue." });
            }
        }
    };


    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error: any) => {
                toast.error(error.message);
            });
        }
    }, [errors]);

    return (
        <>
            <Seo title="Inscription - Task Manager" description="S'inscrire sur Task Manager, votre gestionnaire de tâches." />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">S'inscrire sur Task Manager</h2>
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-4">
                            <Input
                                type="email"
                                placeholder="Adresse email"
                                {...register("email")}
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mot de passe"
                                {...register("password")}
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="mb-6 relative">
                            <Input
                                type={showpassword_confirmation ? "text" : "password"}
                                placeholder="Confirmer le mot de passe"
                                {...register("password_confirmation")}
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                            <button
                                type="button"
                                onClick={() => setShowpassword_confirmation(!showpassword_confirmation)}
                                className="absolute right-3 top-3 text-gray-600"
                            >
                                {showpassword_confirmation ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <Button text={isSubmitting ? "Inscription en cours..." : "S'inscrire"} type="submit" disabled={isSubmitting} />
                    </form>

                    <p className="mt-4 text-center">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/connexion" className="text-blue-500 hover:text-blue-600">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Inscription;
