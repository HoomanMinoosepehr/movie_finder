import Register from "@/components/Register";

interface AuthProps {
    params: {
        authMode: string;
    };
}

export default async function Auth({ params }: AuthProps) {
    const { authMode } = await params;

    return (
        <div>
            <h1>Auth</h1>
            {
                (authMode === 'login') ? (
                    <div>Login</div>
                ) : (authMode === 'register') ? (
                    <div>
                        <Register />
                    </div>
                ) : null
            }
        </div>
    );
}