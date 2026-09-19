document.addEventListener("DOMContentLoaded", function () {
    const helpForm = document.getElementById("helpForm");

    if (!helpForm) {
        return;
    }

    helpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const country = document.getElementById("country").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const helpType = document.getElementById("helpType").value;
        const amount = document.getElementById("amount").value;
        const message = document.getElementById("message").value.trim();

        if (
            !fullName ||
            !email ||
            !country ||
            !phone ||
            !helpType ||
            !amount ||
            !message
        ) {
            alert("Please complete all required fields.");
            return;
        }

        if (Number(amount) < 0) {
            alert("Please enter a valid requested amount.");
            return;
        }

        alert(
            "Your request has been received for review. " +
            "Please wait for further instructions."
        );

        helpForm.reset();
    });
});
