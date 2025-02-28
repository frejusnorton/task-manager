// src/pages/auth/Connexion.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Seo from '../../components/Seo';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAccepted, setIsAccepted] = useState(false); 
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Mot de passe:', password);
        console.log('Conditions acceptées:', isAccepted);
    };

    return (
        <>
            <Seo title="Connexion - Task Manager" description="Se connecter à votre gestionnaire de tâches." />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Entrez votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full p-3"
                            />
                        </div>
                        <Button text="Se connecter" type="submit" disabled={!isAccepted} />
                    </form>
                    <p className="mt-4 text-center">
                        Vous n'avez pas de compte ?{' '}
                        <Link to="/inscription" className="text-blue-500 hover:text-blue-600">
                            S'inscrire
                        </Link>
                    </p>
                   
                </div>
            </div>
        </>
    );
};

export default Connexion;
