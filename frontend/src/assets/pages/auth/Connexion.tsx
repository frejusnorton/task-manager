import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Seo from '../../components/Seo';
import { loginUser } from '../../services/authService'; 
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().min(6, "Le mot de passe doit avoir au moins 6 caractères").required("Le mot de passe est requis"),
});

interface FormData {
    email: string;
    password: string;
}

const Connexion: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const onSubmit = async (formData: FormData) => {
        try {
            const response = await loginUser(formData); 
            toast.success("Connexion réussie !");
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', response.user.email);
            navigate('/dashboard');
        } 
        catch (error: unknown) {
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
            <Seo title="Connexion - Task Manager" description="Se connecter à votre gestionnaire de tâches." />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-4">
                            <Input
                                type="email"
                                placeholder="Entrez votre email"
                                {...register("email")}
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                {...register("password")}
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                        </div>
                        <Button text={isSubmitting ? "Connexion en cours..." : "Se connecter"} type="submit" disabled={isSubmitting} />
                    </form>
                    <p className="mt-4 text-center">
                        Vous n'avez pas de compte ?{' '}
                        <Link to="/inscription" className="text-blue-500 hover:text-blue-600">
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Connexion;
