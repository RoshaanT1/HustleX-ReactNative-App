import { create } from 'zustand';

type storeType = {
    name: string;
    setName: (newName: string) => void;
    age: number;
    setAge: (newAge: number) => void;
    email: string;
    setEmail: (newEmail: string) => void;
    gender: string;
    setGender: (newGender: string) => void;
    password: string;
    setPassword: (newGender: string) => void;
    city: string;
    setCity: (newGender: string) => void;
    phoneNumber: string;
    setPhoneNumber: (newGender: string) => void;
};

export const useStore = create<storeType>((set) => ({
    name: '',
    setName: (newName) => set(() => ({
        name: newName,
    })),
    age: 0,
    setAge: (newAge) => set(() => ({
        age: newAge,
    })),
    email: '',
    setEmail: (newEmail) => set(() => ({
        email: newEmail,
    })),
    gender: 'Unspecified',
    setGender: (newGender) => set(() => ({
        gender: newGender,
    })),
    password: '',
    setPassword: (newPassword) => set(() => ({
        password: newPassword,
    })),
    city: 'Karachi',
    setCity: (newCity) => set(() => ({
        city: newCity,
    })),
    phoneNumber: '',
    setPhoneNumber: (newphoneNumber) => set(() => ({
        phoneNumber: newphoneNumber,
    })),
}));