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

export async function createRoom(room) {
    return await client.from('rooms').insert(room);
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
    });
    if (response.error) {
        return null;
    }
    // Construct the URL to this image:
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}

export async function getRooms() {
    return await client.from('rooms').select('*');
}

export async function getRoom(id) {
    return await client
        .from('rooms')
        .select('*, chat(*,profiles(*))')
        .eq('id', id)
        .order('created_at', { foreignTable: 'chat', ascending: false })
        .single();
}

export async function createMessage(message) {
    return await client.from('chat').insert(message).single();
}

export function realTime(roomId, messageUpload) {
    client.from(`chat:room_id=eq.${roomId}`).on('INSERT', messageUpload).subscribe();
}

export async function getMessage(id) {
    return await client.from('chat').select('*, profiles()').eq('id', id).single();
}

// profiles

export async function updateProfile(userId, profile) {
    return await client.from('profiles').upsert(profile).single();
}

export async function getProfile(user_id) {
    const response = await client.from('profiles').select().match({ user_id }).maybeSingle();
    return response;
}

export async function getProfiles() {
    return await client.from('profiles').select();
}
