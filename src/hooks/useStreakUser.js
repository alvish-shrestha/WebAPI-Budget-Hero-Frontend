import { useQuery } from "@tanstack/react-query";
import { getStreakService } from "../services/streakService";
import { toast } from "react-toastify";
import { launchConfetti } from "../utils/streakConfetti";

let previousBadges = []; // Track outside hook to compare across renders

export const useStreakUser = () => {
    return useQuery({
        queryKey: ["streak"],
        queryFn: async () => {
            const result = await getStreakService();
            if (result.success) {
                const newBadges = result.badges || [];
                if (
                    previousBadges.length &&
                    newBadges.length > previousBadges.length
                ) {
                    launchConfetti();
                }
                previousBadges = newBadges;
                return result;
            } else {
                throw new Error("Failed to fetch streak");
            }
        },
        onError: (err) => {
            toast.error(err?.message || "Error fetching streak");
        },
        staleTime: 2 * 60 * 1000, // 2 minutes cache
        refetchOnWindowFocus: false,
    });
};
