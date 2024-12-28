"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from URL parameters
        const code = searchParams.get("code");
        if (!code) {
          throw new Error("No authorization code received");
        }

        // Exchange code for tokens from Google
        const tokenResponse = await fetch(
          "https://oauth2.googleapis.com/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
              redirect_uri: "http://localhost:3000/googlecallback",
              access_type: "offline",
              grant_type: "authorization_code",
            }),
          }
        );

        if (!tokenResponse.ok) {
          throw new Error("Failed to exchange code for tokens");
        }

        const tokens = await tokenResponse.json();

        // Get user info from Google
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error("Failed to get user info");
        }

        const googleUser = await userInfoResponse.json();

        // Send user data to your backend
        const backendResponse = await fetch(
          "http://localhost:8000/api/google/callback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              google_id: googleUser.sub,
              email: googleUser.email,
              name: googleUser.name,
              access_token: tokens.access_token,
              expires_in: tokens.expires_in,
            }),
          }
        );

        if (!backendResponse.ok) {
          const errorData = await backendResponse.json();
          if (errorData.message === "L'adresse email est deja existé") {
            // Show toast message
            toast.error(
              "L'adresse email existe déjà. Veuillez utiliser une autre adresse."
            );
          } else {
            toast.error("Une erreur est survenue lors de l'authentification.");
          }
          throw new Error("Backend authentication failed");
        }

        const { access_token, refresh_token } = await backendResponse.json();

        // Save your backend tokens
        setToken(access_token, refresh_token);
      } catch (error) {
        console.log("Google authentication error:", error);
        router.push("/login?error=auth_failed");
      } finally {
        router.push("/dashboard");
      }
    };

    handleCallback();
  }, [router, setToken, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-lg">Authentication en cours...</p>
      </div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense>
      <GoogleCallbackContent />
    </Suspense>
  );
}