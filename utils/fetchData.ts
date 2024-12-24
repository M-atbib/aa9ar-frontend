import { useAppStore } from "@/stores";
import { useAuthStore } from "@/stores/authStore";
import Cookies from "js-cookie";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: object;
  requiresAuth?: boolean;
}

interface FetchResponse<T> {
  data: T;
  status: number;
}

async function refreshAccessToken(): Promise<string | null> {
  const { refreshTokenHandler } = useAuthStore.getState();
  try {
    return await refreshTokenHandler();
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

export async function fetchData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body = null,
    requiresAuth = false,
  } = options;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api${endpoint}`;
  console.log('token',Cookies.get("token"));

  const accessToken = Cookies.get("token");
  console.log('accessToken' , accessToken);
  
  const { setError } = useAppStore.getState();

  // Initialize fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: new Headers({
      ...headers,
      "Content-Type": "application/json",
    }),
    body: body ? JSON.stringify(body) : null,
  };

  if (requiresAuth) {
    (fetchOptions.headers as Headers).append(
      "Authorization",
      `Bearer ${accessToken}`
    );
  }

  try {
    const response = await fetch(url, fetchOptions);
    const responseData = await response.json();

    switch (response.status) {
      case 401: {
        const newToken = await refreshAccessToken();
        if (newToken) {
          // Retry the original request with new token
          (fetchOptions.headers as Headers).set(
            "Authorization",
            `Bearer ${newToken}`
          );
          const retryResponse = await fetch(url, fetchOptions);
          const retryData = await retryResponse.json();

          if (!retryResponse.ok) {
            setError({
              success: false,
              message: retryData.message,
              data: { error: [retryData.message] },
            });
            throw new Error(retryData.message);
          }

          return {
            data: retryData,
            status: retryResponse.status,
          };
        }
        setError({
          success: false,
          message: responseData.message,
          data: { error: [responseData.message] },
        });
        throw new Error(responseData.message);
      }

      case 403: {
        setError({
          success: false,
          message: responseData.message,
          data: { error: [responseData.message] },
        });
        throw new Error(responseData.message);
      }

      case 404: {
        setError({
          success: false,
          message: responseData.message,
          data: { error: [responseData.message] },
        });
        throw new Error(responseData.message);
      }

      case 500: {
        setError({
          success: false,
          message: responseData.message,
          data: { error: [responseData.message] },
        });
        throw new Error(responseData.message);
      }
    }

    if (!response.ok) {
      setError({
        success: false,
        message: responseData.message,
        data: { error: [responseData.message] },
      });
      throw new Error(responseData.message);
    }

    return {
      data: responseData,
      status: response.status,
    };
  } catch (err) {
    console.log("Error fetching data:", err);
    setError({
      success: false,
      message: err instanceof Error ? err.message : "An error occurred",
      data: {
        error: [err instanceof Error ? err.message : "An error occurred"],
      },
    });
    return {
      data: {} as T,
      status: 500,
    };
  }
}
