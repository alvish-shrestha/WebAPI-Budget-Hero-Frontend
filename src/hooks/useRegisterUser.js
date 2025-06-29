import { registerUserService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
    return useMutation(
        {
            mutationFn: registerUserService,
            mutationKey: ["register-key"],
            onSuccess: (data) => {
                toast.success(data?.message || "Registration Success")
                // formik.resetForm();
            },
            onError: (err) => {
                console.log(err);
                toast.error(err?.message || "Registration Failed")
            }
        }
    )
}