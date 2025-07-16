import confetti from "canvas-confetti";
import { toast } from "react-toastify";

export function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
    toast.success("🎉 New badge unlocked!");
}
