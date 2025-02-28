
import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registerUser } from '../../services/authService';

const Inscription: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.passwordConfirmation) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await registerUser(formData);
            console.log(response);
        } catch (error: any) {
            setError('Une erreur est survenue lors de l\'inscription.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Inscription</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} noValidate>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Adresse email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirmer le mot de passe"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    required
                />

                <Button text="S'inscrire" type="submit" />
            </form>
        </div>
    );
};

export default Inscription;
