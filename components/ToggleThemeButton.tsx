import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-muted-foreground"
    >
      {theme === "light" ? (
        <SunIcon className="h-7 w-7" />
      ) : (
        <MoonIcon className="h-7 w-7" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
