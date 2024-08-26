import { authenticateUser } from 'backend/auth';
import wixLocation from 'wix-location';
import { local } from 'wix-storage';

$w.onReady(() => {
    $w("#loginBtn").onClick(async () => {
        let email = $w("#emailn").value;
        let password = $w("#passin").value;

        console.log('Attempting login with email:', email);

        // Call the backend to authenticate and create a session
        const sessionId = await authenticateUser(email, password);

        if (sessionId) {
            local.setItem("sessionId", sessionId); // Store session ID in local storage

            console.log("Login successful, session ID:", sessionId);

            // Redirect based on user role
            const sessionData = await getSession(sessionId);
            if (sessionData.role === "admin") {
                wixLocation.to("/admin-dashboard");
            } else {
                wixLocation.to("/user-dashboard");
            }
        } else {
            console.log("Login failed for:", email);
            $w("#errorText").text = "Invalid email or password";
            $w("#errorText").show();
        }
    });
});
