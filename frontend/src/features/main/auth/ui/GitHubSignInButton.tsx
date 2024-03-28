import { Button } from "@/src/shared/shadcn";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const GitHubSignInButton = ({ title }: { title: string }) => {
  const handleOauth = async (event: any) => {
    event.preventDefault();
    window.location.href = `${process.env.API_URL}/auth/github/callback`;
  };
  return (
    <Button
      onClick={handleOauth}
      type={"button"}
      className="px-3 md:px-5 py-3 lg:py-5 xl:py-7 w-full"
    >
      <div className="flex items-center gap-2">
        <GitHubLogoIcon className="w-6 h-6" />
        <h3 className="text-lg">{title}</h3>
      </div>
    </Button>
  );
};
