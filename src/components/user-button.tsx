import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push("/")
}
  return (
    <div className="flex items-center font-bold">
      {session ? ( 
        <div className="flex items-center">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center space-x-3 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition h-10">
              <span>{session.user?.name}</span>
              <Avatar className="size-8">
                <AvatarImage src={session.user?.token?.picture || undefined} />
                <AvatarFallback className="bg-sky-900">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-40">
              <DropdownMenuItem className="h-10" onClick={handleSignOut}>
                Log out
              </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
      <div className="flex space-x-3">
        <Button variant="outline" className="h-10 px-4 hover:bg-gray-800 transition">
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline" className="h-10 px-4 hover:bg-gray-800 transition">
          <Link href="/register">Register</Link>
        </Button>
      </div>
      )}
    </div>
  );
};

export default UserButton;