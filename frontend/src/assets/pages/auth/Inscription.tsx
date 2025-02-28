import React, { useState } from "react";
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

// Schéma de validation
const schema = yup.object().shape({
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().min(6, "Le mot de passe doit avoir au moins 6 caractères").required("Le mot de passe est requis"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Veuillez confirmer le mot de passe"),
});

// Type des données du formulaire
interface FormData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

const Inscription: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false); // Séparation pour confirmation du mot de passe
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData: FormData) => {
        try {
            setSuccessMessage(null); // Réinitialiser le message de succès
            const response = await registerUser(formData);
            setSuccessMessage("Inscription réussie !");
            console.log("Inscription réussie :", response);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError("email", { type: "server", message: error.response?.data?.message || "Une erreur est survenue." });
            } else {
                setError("email", { type: "server", message: "Une erreur inconnue est survenue." });
            }
        }
    };

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
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className="mb-6 relative">
                            <Input
                                type={showPasswordConfirmation ? "text" : "password"}
                                placeholder="Confirmer le mot de passe"
                                {...register("passwordConfirmation")}
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                className="absolute right-3 top-3 text-gray-600"
                            >
                                {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.passwordConfirmation && <p className="text-red-500">{errors.passwordConfirmation.message}</p>}
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
        </>
    );
};

export default Inscription;
