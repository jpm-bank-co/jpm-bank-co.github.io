
document.addEventListener("DOMContentLoaded", function () {
    const helpForm = document.getElementById("helpForm");

    if (!helpForm) return;

    helpForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const {
            data: { user },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !user) {
            alert("Please log in before submitting a request.");
            window.location.href = "login.html";
            return;
        }

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const country = document.getElementById("country").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const helpType = document.getElementById("helpType").value;
        const amount = Number(document.getElementById("amount").value);
        const message = document.getElementById("message").value.trim();

        if (!fullName || !email || !country || !phone ||
            !helpType || !message || !Number.isFinite(amount) || amount < 0) {
            alert("Please complete all fields correctly.");
            return;
        }

        const { data: profile, error: profileError } =
    await supabaseClient
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

if (profileError || !profile) {
    console.error("Profile lookup failed:", {
        message: profileError?.message,
        code: profileError?.code,
        userId: user.id
    });

    alert("Profile lookup failed. Please check the browser console.");
    return;
}

const { error } = await supabaseClient
    .from("requests")
    .insert({
        user_id: profile.id,
        full_name: fullName,
        email: email,
        country: country,
        phone: phone,
        help_type: helpType,
        amount: amount,
        message: message,
        status: "pending"
    });

        if (error) {
            console.error("Supabase error:", error);
            alert("Your request could not be saved. Please check the database configuration and permissions.");
            return;
        }

        alert("Your request has been submitted successfully.");
        helpForm.reset();
    });
});
            
