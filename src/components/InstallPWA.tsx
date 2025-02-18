import { useEffect, useState } from "react";
import { Alert, IconButton, Slide } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Simple mobile detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      console.log("Install prompt captured");
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("No install prompt available");
      return;
    }

    try {
      // Show the browser's install prompt
      await deferredPrompt.prompt();
      console.log("Install prompt shown");

      // Wait for the user's choice
      const choiceResult = await deferredPrompt.userChoice;
      console.log("User choice:", choiceResult.outcome);

      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
        setShowBanner(false);
      } else {
        console.log("User dismissed the install prompt");
      }

      // Clear the stored prompt
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Error showing install prompt:", error);
    }
  };

  // Only show on mobile devices and when installable (or in development)
  const shouldShow = (!!deferredPrompt || import.meta.env.DEV) && isMobile;

  return !shouldShow ? null : (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      <Slide direction="down" in={showBanner} mountOnEnter unmountOnExit>
        <Alert
          severity="info"
          icon={<GetAppIcon />}
          action={
            <>
              <IconButton
                aria-label="install"
                color="info"
                size="small"
                onClick={handleInstallClick}
                sx={{ mr: 1 }}
              >
                <GetAppIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowBanner(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </>
          }
          sx={{
            margin: 1,
            borderRadius: 2,
            alignItems: "center",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "divider",
            bgcolor: "primary.dark",
          }}
        >
          Install this app on your device for a better experience
        </Alert>
      </Slide>
    </div>
  );
}
