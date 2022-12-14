const SUPABASE_URL = 'https://rzhxqrqpkocpayxwaufn.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6aHhxcnFwa29jcGF5eHdhdWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU1MTQwOTUsImV4cCI6MTk4MTA5MDA5NX0.gUQd8rmoDoBHttWYnX7Iw6hWfyrKezsfb07WF0eMyyw';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
