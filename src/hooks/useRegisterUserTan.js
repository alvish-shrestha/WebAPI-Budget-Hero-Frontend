import { useMutation } from "@tanstack/react-query";
// useMutation for (POST/UPDATE(PUT/PATCH)/DELETE)
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

export const useRegisterUserTan = () => {
  return useMutation(
    {
        mutationFn: registerUserService, // which funtion to run
        mutationKey: ["register"], // key for this hook
        onSuccess: (data) => {
            toast.success(data.message || "Registration Successful")
        },
        onError: (err) => {
            toast.error(err.message || "Registration Failed")
        }
    },
  );
};