
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
            alert("Veuillez vous connecter avant d'envoyer une demande.");
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
            alert("Veuillez remplir correctement tous les champs.");
            return;
        }

        const { data: profile, error: profileError } =
            await supabaseClient
                .from("profiles")
                .select("id")
                .eq("user_id", user.id)
                .single();

        if (profileError || !profile) {
            alert("Votre profil est introuvable. Veuillez contacter l'administrateur.");
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
            console.error("Erreur Supabase :", error);
            alert("La demande n'a pas été enregistrée. Vérifiez les colonnes et les autorisations Supabase.");
            return;
        }

        alert("Votre demande a été enregistrée.");
        helpForm.reset();
    });
});
            
