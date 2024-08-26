import { getSession } from 'backend/sessions';
import wixLocation from 'wix-location';
import { local } from 'wix-storage';

$w.onReady(async function () {
    const sessionId = local.getItem("sessionId");

    if (!sessionId) {
        console.warn("No session ID found, redirecting to login page.");
        wixLocation.to("/login");
        return;
    }

    // Retrieve session data from the server
    const sessionData = await getSession(sessionId);

    if (!sessionData) {
        console.warn("Invalid session, redirecting to login page.");
        wixLocation.to("/login");
    } else {
        console.log("Session active for:", sessionData.email);

        const currentPage = wixLocation.url.split("/").pop();

        if (sessionData.role === "admin" && !currentPage.includes("admin")) {
            wixLocation.to("/admin-dashboard");
        } else if (sessionData.role === "user" && currentPage.includes("admin")) {
            wixLocation.to("/user-dashboard");
        }
    }
});
