import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

export const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    if (loading) return;

    if (isPublicRoute) {
      return;
    }

    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, location.pathname, navigate, isPublicRoute]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner /> Loading...
      </div>
    );
  }

  if (!isPublicRoute && !user) {
    return null;
  }

  return <>{children}</>;
};
