(function() {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
    new MutationObserver(e => {
        for (const o of e)
            if (o.type === "childList")
                for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && s(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function r(e) {
        const o = {};
        return e.integrity && (o.integrity = e.integrity), e.referrerpolicy && (o.referrerPolicy = e.referrerpolicy), e.crossorigin === "use-credentials" ? o.credentials = "include" : e.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function s(e) {
        if (e.ep) return;
        e.ep = !0;
        const o = r(e);
        fetch(e.href, o)
    }
})();
const f = "/assets/bot-61bdb6bf.svg",
    m = "/assets/user-bcdeb18e.svg",
    c = document.querySelector("form"),
    a = document.querySelector("#chat_container");
let d;

function p(t) {
    t.textContent = "", d = setInterval(() => {
        t.textContent += ".", t.textContent === "...." && (t.textContent = "")
    }, 300)
}

function g(t, n) {
    let r = 0,
        s = setInterval(() => {
            r < n.length ? (t.innerHTML += n.charAt(r), r++) : clearInterval(s)
        }, 20)
}

function h() {
    const t = Date.now(),
        r = Math.random().toString(16);
    return `id-${t}-${r}`
}

function l(t, n, r) {
    return `
      <div class="wrapper ${t&&"ai"}">
        <div class="chat">
          <div class="profile">
            <img
              src="${t?f:m}"
              alt=${t?"bot":"user"}"
            />
          </div>
          <div class="message" id=${r}>${n}</div>
        </div>
      </div>
    `
}
const u = async t => {
    t.preventDefault();
    const n = new FormData(c);
    a.innerHTML += l(!1, n.get("prompt")), c.reset();
    const r = h();
    a.innerHTML += l(!0, " ", r), a.scrollTop = a.scrollHeight;
    const s = document.getElementById(r);
    p(s);
    const e = await fetch("https://chatgptclone-dqpi.onrender.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: n.get("prompt")
        })
    });
    if (clearInterval(d), s.innerHTML = " ", e.ok) {
        const i = (await e.json()).bot.trim();
        g(s, i)
    } else await e.text(), s.innerHTML = "Something went wrong"
};
c.addEventListener("submit", u);
c.addEventListener("keyup", t => {
    t.keyCode === 13 && u(t)
});