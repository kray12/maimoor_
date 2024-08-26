import wixData from 'wix-data';
import { createSession, deleteSession } from 'backend/sessions';

export async function authenticateUser(email, password) {
    const query = await wixData.query("newUsers")
        .eq("email", email)
        .eq("password", password) // Remember to hash passwords in production
        .find();

    if (query.items.length > 0) {
        const user = query.items[0];
        const sessionId = await createSession(user._id, user.email, user.admin ? "admin" : "user");
        return sessionId; // Return the session ID
    } else {
        return null; // Invalid credentials
    }
}

// Logout and remove session
export async function logout(sessionId) {
    await deleteSession(sessionId);
}
