const burger = document.querySelector("#burger");
        const phone = document.querySelector(".phone-nav");
        const close = document.querySelector(".close");
        burger.addEventListener('click', function () {
            if (phone.classList.contains("hidden")) {
                phone.classList.remove("hidden");
                phone.classList.add("block");
                close.classList.remove("hidden");
                close.classList.add("block");
                burger.classList.add("hidden")
            }
        })
        close.addEventListener('click', function () {
            if (close.classList.contains("block")) {
                close.classList.remove("block");
                close.classList.add("hidden")
                phone.classList.remove("block")
                phone.classList.add("hidden")
                burger.classList.remove("hidden")
            }
        })