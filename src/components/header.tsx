import { LogOut, Funnel, Ghost, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl">My Tasks</p>
          <p>Hello, Demo</p>
        </div>
        <Button variant="ghost" className="flex gap-2">
          <LogOut size={20} strokeWidth={2} />
          Log Out
        </Button>
      </div>
      <div>
        <div className="flex w-full gap-2 mt-4">
          <div className="relative w-full">
            <Search size={20} strokeWidth={1.5}  className="absolute  left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              type="email"
              placeholder="Search for Tasks..."
            />
          </div>
          <Button variant="ghost">
            <Funnel />
          </Button>
          <Button type="submit" variant="outline">
            All
          </Button>
          <Button type="submit" variant="outline">
            All levels
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
