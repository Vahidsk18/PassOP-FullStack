import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
// import { useAuth } from '../context_api/AuthContext'
import { useAuth } from "../context_api/AuthContext";
import { showSuccess, showError, showInfo, showWarn } from '../utils/toast'
import API from '../api/axiosInstance';


const SECRET = import.meta.env.VITE_ENCRYPT_KEY

export function usePasswords() {

    const { user } = useAuth()

    const [passwordArray, setPasswordArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [form, setForm] = useState({ website: '', username: '', password: '' })
    const [editIndex, setEditIndex] = useState(null)

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function getAllPasswords() {

        if (!user?.id) return;

        setIsLoading(true);

        try {
            const res =
                await API.get(`/passwords`);
            setPasswordArray(
                res.data.data
            );

        } catch (error) {
            showError(
                "Failed to load passwords"
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            getAllPasswords();
        }
    }, [user]);

    async function savePassword() {

        const encryptedPassword =
            CryptoJS.AES.encrypt(
                form.password,
                SECRET
            ).toString();

        if (!form.website || !form.username || !form.password) {
            return showWarn(
                "Enter Information"
            );
        }

        try {
            const res =
                await API.post(
                    "/passwords", { ...form, password: encryptedPassword }
                );

            setPasswordArray(
                prev => [
                    ...prev,
                    res.data.data
                ]
            );
            setForm({
                website: "",
                username: "",
                password: ""
            });
            showSuccess(
                "Password Saved"
            );
        } catch {
            showError(
                "Failed to save password"
            );
        }
    }

    async function updatePassword() {


        if (
            !form.website ||
            !form.username ||
            !form.password
        ) {
            return showWarn(
                "Enter Information"
            );
        }
        try {

            const res =
                await API.put(
                    `/passwords/${editIndex}`, form
                );

            setPasswordArray(
                prev =>
                    prev.map(p =>
                        p._id === editIndex
                            ? res.data.data
                            : p
                    )
            );

            setEditIndex(null);
            setForm({
                website: "",
                username: "",
                password: ""
            });

            showInfo(
                "Updated Successfully"
            );

        } catch {
            showError(
                "Update Failed"
            );

        }
    }

    async function deletePassword(id) {

        try {
            await API.delete(`/passwords/${id}`,);

            setPasswordArray(
                prev =>
                    prev.filter(
                        p => p._id !== id
                    )
            );

            showWarn(
                "Deleted Successfully"
            );

        } catch {
            showError(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }
    }

    function startEdit(entry) {

        let password = entry.password;

        if (SECRET) {
            try {
                const bytes = CryptoJS.AES.decrypt(
                    entry.password,
                    SECRET
                );

                password =
                    bytes.toString(CryptoJS.enc.Utf8) ||
                    entry.password;

            } catch {
                password = entry.password;
            }
        }

        setForm({
            website: entry.website,
            username: entry.username,
            password
        });

        setEditIndex(entry._id);
    }


    function decrypt(encrypted) {

        if (!encrypted) {
            return "";
        }

        if (!SECRET) {
            return encrypted;
        }

        try {

            const bytes = CryptoJS.AES.decrypt(
                encrypted,
                SECRET
            );

            const result = bytes.toString(
                CryptoJS.enc.Utf8
            );

            return result || encrypted;

        } catch (err) {

            console.log("Decrypt Error:", err);

            return encrypted;
        }
    }

    return {
        passwordArray,
        isLoading,
        form,
        editIndex,
        handleChange,
        savePassword,
        updatePassword,
        deletePassword,
        startEdit,
        decrypt,
    }
}